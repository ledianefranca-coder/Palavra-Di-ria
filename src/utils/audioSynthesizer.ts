// Web Audio API Ambient Sound Synthesizer & Speech Reader
let audioCtx: AudioContext | null = null;
let activeNodes: { stop: () => void }[] = [];
let currentSoundType: string | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function stopAmbientSound() {
  activeNodes.forEach((node) => {
    try {
      node.stop();
    } catch (e) {
      // ignore
    }
  });
  activeNodes = [];
  currentSoundType = null;
}

export function playAmbientSound(type: "rain" | "forest" | "ocean" | "river" | "wind" | "piano") {
  stopAmbientSound();
  const ctx = getAudioContext();
  currentSoundType = type;

  if (type === "rain") {
    // Generate pink noise for soft rain
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.04; // low gain for soft rain
      b6 = white * 0.115926;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1200;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.3;

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
    activeNodes.push({
      stop: () => {
        try {
          noiseSource.stop();
        } catch (e) {}
      },
    });
  } else if (type === "forest" || type === "wind") {
    // Wind / Forest breeze with LFO filter modulation
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.05;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 400;
    filter.Q.value = 3.0;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.2; // slow breeze modulation
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 250;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.25;

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    noiseSource.start();
    lfo.start();

    activeNodes.push({
      stop: () => {
        try {
          noiseSource.stop();
          lfo.stop();
        } catch (e) {}
      },
    });
  } else if (type === "ocean" || type === "river") {
    // Ocean wave rhythm LFO
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.08;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12; // slow waves ~8s cycle
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.2;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.15;

    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);

    noiseSource.connect(filter);
    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    noiseSource.start();
    lfo.start();

    activeNodes.push({
      stop: () => {
        try {
          noiseSource.stop();
          lfo.stop();
        } catch (e) {}
      },
    });
  } else if (type === "piano") {
    // Soft soothing meditative chord synth (C major / G / Am / F)
    const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.12;
    masterGain.connect(ctx.destination);

    const oscs = freqs.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = 0.25;
      osc.connect(g);
      g.connect(masterGain);
      osc.start();
      return osc;
    });

    activeNodes.push({
      stop: () => {
        oscs.forEach((o) => {
          try {
            o.stop();
          } catch (e) {}
        });
      },
    });
  }
}

export function getCurrentSoundType(): string | null {
  return currentSoundType;
}

// Web Speech API for reading text aloud in Portuguese
export function speakText(
  text: string,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: () => void
): SpeechSynthesisUtterance | null {
  if (!("speechSynthesis" in window)) {
    console.warn("Navegador não suporta leitura de áudio.");
    if (onError) onError();
    return null;
  }

  window.speechSynthesis.cancel(); // Stop current speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.rate = 0.92; // slightly slower, calm reading
  utterance.pitch = 1.0;

  // Try to find a good PT-BR voice
  const voices = window.speechSynthesis.getVoices();
  const ptVoice = voices.find((v) => v.lang.includes("pt") || v.lang.includes("PT"));
  if (ptVoice) {
    utterance.voice = ptVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    if (onError) onError();
  };

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
