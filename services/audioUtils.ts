export const PCM_SAMPLE_RATE = 16000;
export const AUDIO_SAMPLE_RATE = 24000;

export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function float32To16BitPCM(float32Arr: Float32Array): ArrayBuffer {
  const buffer = new ArrayBuffer(float32Arr.length * 2);
  const view = new DataView(buffer);
  for (let i = 0; i < float32Arr.length; i++) {
    let s = Math.max(-1, Math.min(1, float32Arr[i]));
    s = s < 0 ? s * 0x8000 : s * 0x7FFF;
    view.setInt16(i * 2, s, true);
  }
  return buffer;
}

export async function decodeAudioData(
  audioData: Uint8Array,
  sampleRate: number = AUDIO_SAMPLE_RATE
): Promise<AudioBuffer> {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: sampleRate,
  });
  
  const pcm16 = new Int16Array(audioData.buffer);
  const audioBuffer = audioCtx.createBuffer(1, pcm16.length, sampleRate);
  const channelData = audioBuffer.getChannelData(0);
  
  for (let i = 0; i < pcm16.length; i++) {
    // Normalize 16-bit integer to float [-1.0, 1.0]
    channelData[i] = pcm16[i] / 32768.0;
  }
  
  await audioCtx.close();
  return audioBuffer;
}