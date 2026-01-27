import React, { useState } from 'react';
import { speak, startListening } from './utils/speechUtils';
import './WordCard.css';

const WordCard = ({ letter, word, image, onLearn, onSpeak }) => {
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [recognition, setRecognition] = useState(null);

  const playAudio = () => {
    speak(word, 0.8);
    if (onSpeak) onSpeak();
  };

  const startSpeech = () => {
    if (isListening) return;
    setIsListening(true);
    setFeedback('🎤 Listening... Say the word!');

    const rec = startListening(
      (transcript, confidence) => {
        setIsListening(false);
        const cleanTranscript = transcript.trim().toLowerCase();
        const cleanWord = word.toLowerCase().trim();
        
        // Detailed debug log
        console.log('=== WORD MATCHING DEBUG ===');
        console.log('Transcript:', cleanTranscript);
        console.log('Word:', cleanWord);
        console.log('Transcript length:', cleanTranscript.length);
        console.log('Word length:', cleanWord.length);
        console.log('Confidence:', confidence);
        console.log('Exact match:', cleanTranscript === cleanWord);
        console.log('Includes match:', cleanTranscript.includes(cleanWord));
        console.log('Transcript chars:', cleanTranscript.split('').map(c => `${c}(${c.charCodeAt(0)})`));
        console.log('Word chars:', cleanWord.split('').map(c => `${c}(${c.charCodeAt(0)})`));
        
        // Match if exact match OR if word is contained in transcript
        const wordMatch = cleanTranscript === cleanWord || cleanTranscript.includes(cleanWord);
        
        if (wordMatch && confidence > 0.1) {
          setFeedback(`✅ Great job! You said "${cleanWord}"!`);
          onLearn(letter);
          setTimeout(() => setFeedback(''), 2000);
        } else if (wordMatch) {
          // Even with low confidence, if words match exactly, give credit
          setFeedback(`✅ Great job! You said "${cleanWord}"!`);
          onLearn(letter);
          setTimeout(() => setFeedback(''), 2000);
        } else {
          setFeedback(`❌ Not quite. You said "${cleanTranscript}". Say "${cleanWord}"`);
          setTimeout(() => setFeedback(''), 3000);
        }
      },
      (error) => {
        setIsListening(false);
        setFeedback(`❌ Error: ${error}`);
        setTimeout(() => setFeedback(''), 2000);
      }
    );
    setRecognition(rec);
  };

  return (
    <div className="word-card">
      <div className="word-letter">{letter}</div>
      <img className="word-image" src={image} alt={word} />
      <div className="word-text">{word}</div>
      
      <div className="word-buttons">
        <button className="word-audio-btn" onClick={playAudio}>
          🔊 Hear Word
        </button>
        <button 
          className={`word-speak-btn ${isListening ? 'listening' : ''}`} 
          onClick={startSpeech}
          disabled={isListening}
        >
          {isListening ? '🎤 Listening...' : '🎤 Say It!'}
        </button>
      </div>

      {feedback && <div className="word-feedback">{feedback}</div>}
    </div>
  );
};

export default WordCard;
