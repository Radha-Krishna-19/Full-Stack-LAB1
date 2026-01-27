
import React, { useState } from 'react';
import { speak, startListening } from './utils/speechUtils';

const playLetterSound = (letter) => {
  speak(letter, 0.8); // Slower speech for letters
};

const Alphabet = ({ completed, onComplete }) => {
  const [listeningLetter, setListeningLetter] = useState(null);
  const [letterFeedback, setLetterFeedback] = useState({});

  const startLetterSpeech = (letter) => {
    if (listeningLetter) return;
    setListeningLetter(letter);
    setLetterFeedback(prev => ({ ...prev, [letter]: '🎤 Listening...' }));

    const rec = startListening(
      (transcript, confidence) => {
        setListeningLetter(null);
        const cleanTranscript = transcript.trim().toLowerCase();
        const cleanLetter = letter.toLowerCase();
        
        // Debug log
        console.log('=== LETTER MATCHING DEBUG ===');
        console.log('Transcript:', cleanTranscript);
        console.log('Letter:', cleanLetter);
        console.log('Confidence:', confidence);
        console.log('Exact match:', cleanTranscript === cleanLetter);
        console.log('Includes match:', cleanTranscript.includes(cleanLetter));
        
        // Match if exact match OR if letter is contained in transcript
        const letterMatch = cleanTranscript === cleanLetter || cleanTranscript.includes(cleanLetter);
        
        if (letterMatch && confidence > 0.1) {
          setLetterFeedback(prev => ({ ...prev, [letter]: `✅ Great! "${letter}"!` }));
          onComplete(letter);
          setTimeout(() => setLetterFeedback(prev => ({ ...prev, [letter]: '' })), 2000);
        } else if (letterMatch) {
          // Even with low confidence, if letters match exactly, give credit
          setLetterFeedback(prev => ({ ...prev, [letter]: `✅ Great! "${letter}"!` }));
          onComplete(letter);
          setTimeout(() => setLetterFeedback(prev => ({ ...prev, [letter]: '' })), 2000);
        } else {
          setLetterFeedback(prev => ({ ...prev, [letter]: `❌ Say "${letter}"` }));
          setTimeout(() => setLetterFeedback(prev => ({ ...prev, [letter]: '' })), 3000);
        }
      },
      (error) => {
        setListeningLetter(null);
        setLetterFeedback(prev => ({ ...prev, [letter]: `❌ Error` }));
        setTimeout(() => setLetterFeedback(prev => ({ ...prev, [letter]: '' })), 2000);
      }
    );
  }

  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="alphabet-page">
      <h2 className="alphabet-title">Tap a letter to learn!</h2>
      <div className="alphabet-grid">
        {alphabets.map((letter) => (
          <div
            key={letter}
            className={`letter-card-child ${completed.includes(letter) ? 'completed' : ''}`}
          >
            <div className="letter-icon-child">{letter}</div>
            <img
              className="letter-img-child"
              src={`https://img.icons8.com/color/144/000000/${letter.toLowerCase()}.png`}
              onError={e => e.target.src = `https://via.placeholder.com/120x120/4ECDC4/FFFFFF?text=${letter}`}
              alt={letter}
            />
            <div className="letter-buttons">
              <button className="letter-sound-btn" onClick={() => playLetterSound(letter)}>
                🔊
              </button>
              <button 
                className="letter-speak-btn" 
                onClick={() => startLetterSpeech(letter)}
                disabled={listeningLetter === letter}
              >
                🎤
              </button>
            </div>
            {letterFeedback[letter] && <div className="letter-feedback">{letterFeedback[letter]}</div>}
            <p className="letter-learn-text">Learn "{letter}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alphabet;
