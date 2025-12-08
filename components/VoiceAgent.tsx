import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, PhoneOff, CalendarCheck, Loader2, Volume2, Headset } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from "@google/genai";
import { base64ToUint8Array, float32To16BitPCM, arrayBufferToBase64, createAudioBufferFromPCM, PCM_SAMPLE_RATE, AUDIO_SAMPLE_RATE } from '../services/audioUtils';

interface VoiceAgentProps {
  onClose: () => void;
  avatarUrl?: string;
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150";

const VoiceAgent: React.FC<VoiceAgentProps> = ({ onClose, avatarUrl = DEFAULT_AVATAR }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [status, setStatus] = useState("Initializing...");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [micMuted, setMicMuted] = useState(false);
  const [appointmentBooked, setAppointmentBooked] = useState<string | null>(null);
  const [humanHandoff, setHumanHandoff] = useState(false);

  // Refs for audio handling and state access in callbacks
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  // Refs for state variables to ensure access in closures (onaudioprocess)
  const micMutedRef = useRef(false);
  const humanHandoffRef = useRef(false);

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

      // Tool 1: Book Appointment
      const bookAppointmentTool: FunctionDeclaration = {
        name: "bookAppointment",
        description: "Book a consultation appointment. Use this when the user confirms they want to meet and provides their details.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the user" },
            contact: { type: Type.STRING, description: "Phone number or email" },
            dateTime: { type: Type.STRING, description: "Preferred date and time of the appointment" },
            reason: { type: Type.STRING, description: "Purpose of the appointment" },
          },
          required: ["name", "contact", "dateTime"],
        },
      };

      // Tool 2: Refer to Human Agent
      const referToHumanTool: FunctionDeclaration = {
        name: "referToHuman",
        description: "Transfer the call to a human agent. MANDATORY to call this if: 1. User explicitly asks for a human/agent. 2. You fail to understand or satisfy the user's request after two attempts.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            reason: { type: Type.STRING, description: "Reason for the transfer (e.g., 'User request', 'Misunderstanding')" },
          },
          required: ["reason"],
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
              // Check refs instead of state to avoid stale closures
              if (micMutedRef.current || humanHandoffRef.current) return;
              
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
              }).catch(err => {
                  console.error("Session send error:", err);
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
              // Use optimized buffer creation with existing context
              const audioBuffer = createAudioBufferFromPCM(audioBytes, ctx);
              
              const bufferSource = ctx.createBufferSource();
              bufferSource.buffer = audioBuffer;
              bufferSource.connect(ctx.destination);
              
              bufferSource.onended = () => {
                 sourcesRef.current.delete(bufferSource);
                 if (sourcesRef.current.size === 0) {
                    setIsSpeaking(false);
                    // Only reset status if we haven't handed off
                    if (!humanHandoffRef.current) {
                        setStatus("Listening...");
                    }
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
              if (!humanHandoffRef.current) {
                  setStatus("Listening...");
              }
            }

            // Handle Tool Calls
            if (message.toolCall) {
                for (const fc of message.toolCall.functionCalls) {
                    if (fc.name === 'bookAppointment') {
                        setStatus("Confirming appointment...");
                        const args = fc.args as any;
                        setAppointmentBooked(`Appointment confirmed for ${args.name} on ${args.dateTime}`);
                        
                        sessionPromise.then(session => {
                            session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Appointment successfully booked. Confirmation details displayed to user." }
                                }
                            });
                        });
                    } else if (fc.name === 'referToHuman') {
                        setStatus("Transferring call...");
                        setHumanHandoff(true);
                        humanHandoffRef.current = true; // Update ref to stop audio input
                        
                        sessionPromise.then(session => {
                            session.sendToolResponse({
                                functionResponses: {
                                    id: fc.id,
                                    name: fc.name,
                                    response: { result: "Transfer initiated. Please inform the user to hold." }
                                }
                            });
                        });
                    }
                }
            }
          },
          onclose: () => {
            setIsConnected(false);
            setStatus("Disconnected");
          },
          onerror: (err) => {
            console.error("Live API Error:", err);
            setStatus("Connection Error");
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `You are Astra, a senior business consultant at Astratrix Technologies. 
Your goal is to have a natural, human-like conversation to understand the user's business challenges and convert them into a potential client by booking a consultation.

**CRITICAL GUARDRAILS (DO NOT VIOLATE):**
1. **NO REPETITION:** Do NOT repeat your name ("I am Astra") or the full company description in every response. Introduce yourself ONLY ONCE at the start.
2. **BE HUMAN:** Do not sound like a robot reading a script. Use varied phrasing.
3. **LISTEN FIRST:** Do not list all products immediately. Ask probing questions to understand the user's needs first.
4. **CONCISE:** Keep responses short (maximum 2 sentences).

**ESCALATION PROTOCOL (MANDATORY):**
You **MUST** call the 'referToHuman' tool immediately if:
- The user explicitly asks for a "human", "agent", "person", or "operator".
- You have misunderstood the user's intent or failed to provide a relevant answer TWICE in a row.
- The user expresses frustration or anger.

**KNOWLEDGE BASE:**
- **Who we are:** Astratrix Technologies, based in Port Harcourt, Nigeria. We build AI for African businesses.
- **Products:** RetailBot Pro, FXInsight, SecureEye Africa, RAILearnin, PawSome Picks, TubeGenius, Course Architect, Revisionary, NexusG, CareBridge, ApexRoute, CARticle, VitalCare.

**CONVERSATION FLOW:**
1. **Greeting:** "Hello! I'm Astra. What business challenge are you facing today?"
2. **Discovery:** Ask follow-up probing questions.
3. **Solution:** Briefly suggest the specific Astratrix tool.
4. **Close/Booking:** "Can I book a quick demo for you?" -> If yes, collect Name/Time -> Call 'bookAppointment'.
`,
          tools: [{ functionDeclarations: [bookAppointmentTool, referToHumanTool] }],
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
    setIsConnected(false);
  };

  const toggleMute = () => {
    setMicMuted(prev => {
        const next = !prev;
        micMutedRef.current = next; // Sync ref for audio loop
        return next;
    });
  };

  if (humanHandoff) {
    return (
      <div className="flex flex-col h-full bg-slate-50 items-center justify-center p-6 text-center animate-in fade-in zoom-in">
        <div className="w-24 h-24 bg-azure/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Headset className="h-10 w-10 text-azure" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Connecting to Agent...</h3>
        <p className="text-gray-600 mb-8">Please hold while we transfer you to a human specialist. Wait time is approximately 2 minutes.</p>
        <button 
          onClick={onClose}
          className="px-6 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition-colors"
        >
          Cancel Call
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Volume2 className={`h-5 w-5 text-azure ${isSpeaking ? 'animate-pulse' : ''}`} />
          <span className="font-bold text-slate-900">Astra Voice</span>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-slate-900">
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>

      {/* Main Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50">
        {/* Avatar Visualizer */}
        <div className="relative mb-8">
            <div className={`w-36 h-36 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isSpeaking ? 'bg-azure/30 scale-125' : 'bg-transparent scale-100'}`}></div>
            <div className={`w-32 h-32 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 delay-75 ${isSpeaking ? 'bg-azure/20 scale-150' : 'bg-transparent scale-100'}`}></div>
            
            <div className={`w-28 h-28 rounded-full border-4 border-white shadow-xl relative z-10 transition-all duration-200 ${isSpeaking ? 'scale-105 border-azure' : 'border-white'}`}>
                {isConnected ? (
                   <img 
                    src={avatarUrl} 
                    alt="Astra Avatar" 
                    className="w-full h-full rounded-full object-cover"
                   />
                ) : (
                   <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                     <Loader2 className="h-8 w-8 text-azure animate-spin" />
                   </div>
                )}
            </div>
            
            {/* Status indicator badge */}
            {isConnected && (
              <div className={`absolute bottom-0 right-2 z-20 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${micMuted ? 'bg-red-500' : 'bg-green-500'}`}>
                {micMuted ? <MicOff className="w-3 h-3 text-white" /> : <Mic className="w-3 h-3 text-white" />}
              </div>
            )}
        </div>

        <p className="text-azure font-medium text-lg mb-2">{status}</p>
        <p className="text-gray-500 text-sm text-center max-w-xs">
          {micMuted ? "Microphone is muted" : "Ask about our products, book an appointment, or request a human agent."}
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