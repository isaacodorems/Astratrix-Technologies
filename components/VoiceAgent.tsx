import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff, CalendarCheck, Loader2, Volume2 } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";
import { base64ToUint8Array, float32To16BitPCM, arrayBufferToBase64, decodeAudioData, PCM_SAMPLE_RATE, AUDIO_SAMPLE_RATE } from '../services/audioUtils';

interface VoiceAgentProps {
  onClose: () => void;
}

const VoiceAgent: React.FC<VoiceAgentProps> = ({ onClose }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState("Initializing...");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState<string | null>(null);

  // Refs for audio handling
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    startSession();
    return () => {
      endSession();
    };
  }, []);

  const startSession = async () => {
    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        setStatus("Error: API Key missing");
        return;
      }

      const ai = new GoogleGenAI({ apiKey });

      // Setup Input Audio
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        sampleRate: PCM_SAMPLE_RATE,
        channelCount: 1,
        echoCancellation: true,
        autoGainControl: true,
        noiseSuppression: true
      }});
      mediaStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: PCM_SAMPLE_RATE });
      audioContextRef.current = audioCtx;
      
      const source = audioCtx.createMediaStreamSource(stream);
      sourceRef.current = source;
      
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      // Setup Output Audio
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: AUDIO_SAMPLE_RATE });
      outputAudioContextRef.current = outputCtx;

      // Define Tool
      const bookAppointmentTool: FunctionDeclaration = {
        name: "bookAppointment",
        description: "Book a consultation appointment for the user.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the user" },
            contact: { type: Type.STRING, description: "Phone number or email" },
            dateTime: { type: Type.STRING, description: "Preferred date and time of the appointment" },
            reason: { type: Type.STRING, description: "Purpose of the appointment (e.g., Automation, Security)" },
          },
          required: ["name", "contact", "dateTime"],
        },
      };

      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnected(true);
            setStatus("Listening...");
            
            // Start processing audio input
            processor.onaudioprocess = (e) => {
              if (micMuted) return; // Simple software mute
              
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = float32To16BitPCM(inputData);
              const base64Data = arrayBufferToBase64(pcm16);

              sessionPromise.then(session => {
                 session.sendRealtimeInput({
                    media: {
                        mimeType: "audio/pcm;rate=16000",
                        data: base64Data
                    }
                 });
              });
            };

            source.connect(processor);
            processor.connect(audioCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              setIsSpeaking(true);
              setStatus("Astra is speaking...");
              
              const ctx = outputAudioContextRef.current!;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              
              const audioBytes = base64ToUint8Array(base64Audio);
              const audioBuffer = await decodeAudioData(audioBytes, AUDIO_SAMPLE_RATE);
              
              const bufferSource = ctx.createBufferSource();
              bufferSource.buffer = audioBuffer;
              bufferSource.connect(ctx.destination);
              
              bufferSource.onended = () => {
                 sourcesRef.current.delete(bufferSource);
                 if (sourcesRef.current.size === 0) {
                    setIsSpeaking(false);
                    setStatus("Listening...");
                 }
              };
              
              bufferSource.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(bufferSource);
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsSpeaking(false);
              setStatus("Listening...");
            }

            // Handle Tool Calls
            if (message.toolCall) {
                setStatus("Confirming appointment...");
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'bookAppointment') {
                        // Execute "Booking"
                        const args = fc.args as any;
                        setAppointmentBooked(`Appointment confirmed for ${args.name} on ${args.dateTime}`);
                        
                        // Send response back to model
                        sessionPromise.then(session => {
                            session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Appointment successfully booked. Confirmation details displayed to user." }
                                }
                            });
                        });
                        // status update happens after audio starts coming back
                    }
                }
            }
          },
          onclose: () => {
            setIsConnected(false);
            setStatus("Disconnected");
          },
          onerror: (err) => {
            console.error(err);
            setStatus("Connection Error");
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are Astra, the voice receptionist for Astratrix. 
          Your goal is to book a consultation appointment for the user. 
          1. Greet the user professionally and ask how you can help.
          2. To book an appointment, you MUST obtain: Name, Contact Info, and Preferred Date/Time.
          3. Ask one question at a time. Keep it conversational.
          4. Once you have the info, call the 'bookAppointment' tool.
          5. After booking, confirm the exact date and time to the user verbally and say goodbye.`,
          tools: [{ functionDeclarations: [bookAppointmentTool] }],
        }
      });
      
      sessionPromiseRef.current = sessionPromise;

    } catch (e) {
      console.error(e);
      setStatus("Failed to initialize");
    }
  };

  const endSession = () => {
    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }
    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
        outputAudioContextRef.current.close();
        outputAudioContextRef.current = null;
    }
    // Clean close not available on promise, rely on context destruction
    setIsConnected(false);
  };

  const toggleMute = () => {
    setMicMuted(!micMuted);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Volume2 className={`h-5 w-5 text-azure ${isSpeaking ? 'animate-pulse' : ''}`} />
          <span className="font-bold text-slate-900">Voice Agent</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-slate-900">
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50">
        {/* Animated Orb */}
        <div className="relative mb-8">
            <div className={`w-32 h-32 rounded-full blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSpeaking ? 'bg-azure/40 scale-150' : 'bg-azure/10 scale-100'}`}></div>
            <div className={`w-24 h-24 rounded-full border-2 border-azure flex items-center justify-center relative z-10 transition-all duration-200 ${isSpeaking ? 'scale-110 shadow-[0_0_30px_rgba(14,165,233,0.3)]' : 'shadow-md bg-white'}`}>
                <div className={`w-20 h-20 rounded-full bg-white flex items-center justify-center`}>
                    {isConnected ? (
                        <div className="flex gap-1 h-8 items-center">
                             {/* Fake waveform */}
                            <div className={`w-1 bg-azure rounded-full transition-all duration-100 ${isSpeaking ? 'h-8 animate-pulse' : 'h-2'}`}></div>
                            <div className={`w-1 bg-azure rounded-full transition-all duration-100 delay-75 ${isSpeaking ? 'h-12 animate-pulse' : 'h-3'}`}></div>
                            <div className={`w-1 bg-azure rounded-full transition-all duration-100 delay-150 ${isSpeaking ? 'h-6 animate-pulse' : 'h-2'}`}></div>
                        </div>
                    ) : (
                        <Loader2 className="h-8 w-8 text-azure animate-spin" />
                    )}
                </div>
            </div>
        </div>

        <p className="text-azure font-medium text-lg mb-2">{status}</p>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          {micMuted ? "Microphone is muted" : "Speak naturally to book an appointment"}
        </p>

        {appointmentBooked && (
            <div className="mt-6 bg-white border border-azure/20 rounded-xl p-4 flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in w-full max-w-xs shadow-sm">
                <div className="bg-azure p-2 rounded-full text-white">
                    <CalendarCheck className="h-5 w-5" />
                </div>
                <div className="text-left flex-1">
                    <p className="text-slate-900 text-sm font-bold">Booking Confirmed</p>
                    <p className="text-gray-600 text-xs mt-1 leading-tight">{appointmentBooked}</p>
                </div>
            </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-6 bg-white border-t border-gray-200 flex justify-center gap-6">
        <button 
            onClick={toggleMute}
            className={`p-4 rounded-full transition-all shadow-sm ${micMuted ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
            {micMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </button>
        <button 
            onClick={onClose}
            className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-red-500/30 transition-all"
        >
            <PhoneOff className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default VoiceAgent;