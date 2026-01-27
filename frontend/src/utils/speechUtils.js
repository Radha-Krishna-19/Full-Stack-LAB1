// Speech Synthesis (Text-to-Speech) utility
export const speak = (text, rate = 1) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech Synthesis not supported in this browser');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.2; // Slightly higher pitch for children
  utterance.volume = 1;

  window.speechSynthesis.speak(utterance);
};

// Speech Recognition utility
export const startListening = (onResult, onError) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn('Speech Recognition not supported in this browser');
    onError('Speech Recognition not supported');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    console.log('Listening...');
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase().trim();
    const confidence = event.results[0][0].confidence;
    onResult(transcript, confidence);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    onError(event.error);
  };

  recognition.onend = () => {
    console.log('Stopped listening');
  };

  recognition.start();
  return recognition;
};
