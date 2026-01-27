import React, { useState } from 'react';
import WordCard from './WordCard';
import { speak } from './utils/speechUtils';
import './Words.css';

// Complete A-Z words for learning
const WORDS = [
  { letter: 'A', word: 'Apple', image: 'https://img.icons8.com/color/144/apple.png' },
  { letter: 'B', word: 'Ball', image: 'https://img.icons8.com/color/144/football2.png' },
  { letter: 'C', word: 'Cat', image: 'https://img.icons8.com/color/144/cat.png' },
  { letter: 'D', word: 'Dog', image: 'https://img.icons8.com/color/144/dog.png' },
  { letter: 'E', word: 'Elephant', image: 'https://img.icons8.com/color/144/elephant.png' },
  { letter: 'F', word: 'Fish', image: 'https://img.icons8.com/color/144/fish.png' },
  { letter: 'G', word: 'Giraffe', image: 'https://img.icons8.com/color/144/giraffe.png' },
  { letter: 'H', word: 'House', image: 'https://img.icons8.com/color/144/building.png' },
  { letter: 'I', word: 'Ice Cream', image: 'https://img.icons8.com/color/144/ice-cream.png' },
  { letter: 'J', word: 'Jellyfish', image: 'https://img.icons8.com/color/144/jellyfish.png' },
  { letter: 'K', word: 'Kite', image: 'https://img.icons8.com/color/144/kite.png' },
  { letter: 'L', word: 'Lion', image: 'https://img.icons8.com/color/144/lion.png' },
  { letter: 'M', word: 'Monkey', image: 'https://img.icons8.com/color/144/monkey.png' },
  { letter: 'N', word: 'Nose', image: 'https://img.icons8.com/color/144/nose.png' },
  { letter: 'O', word: 'Orange', image: 'https://img.icons8.com/color/144/orange.png' },
  { letter: 'P', word: 'Penguin', image: 'https://img.icons8.com/color/144/penguin.png' },
  { letter: 'Q', word: 'Queen', image: 'https://img.icons8.com/color/144/queen.png' },
  { letter: 'R', word: 'Rainbow', image: 'https://img.icons8.com/color/144/rainbow.png' },
  { letter: 'S', word: 'Sun', image: 'https://img.icons8.com/color/144/sun.png' },
  { letter: 'T', word: 'Tiger', image: 'https://img.icons8.com/color/144/tiger.png' },
  { letter: 'U', word: 'Umbrella', image: 'https://img.icons8.com/color/144/umbrella.png' },
  { letter: 'V', word: 'Violin', image: 'https://img.icons8.com/color/144/violin.png' },
  { letter: 'W', word: 'Whale', image: 'https://img.icons8.com/color/144/whale.png' },
  { letter: 'X', word: 'Xylophone', image: 'https://img.icons8.com/color/144/xylophone.png' },
  { letter: 'Y', word: 'Yo-yo', image: 'https://img.icons8.com/color/144/yo-yo.png' },
  { letter: 'Z', word: 'Zebra', image: 'https://img.icons8.com/color/144/zebra.png' },
];

const Words = ({ completed, onComplete }) => {
  const [current, setCurrent] = useState(0);
  const word = WORDS[current];

  const nextWord = () => {
    const next = (current + 1) % WORDS.length;
    setCurrent(next);
    speak(WORDS[next].word, 0.8);
  };

  const prevWord = () => {
    const prev = (current - 1 + WORDS.length) % WORDS.length;
    setCurrent(prev);
    speak(WORDS[prev].word, 0.8);
  };

  return (
    <div className="words-quiz">
      <h2 className="words-title">🎤 Tap the word to hear it!</h2>
      <WordCard
        letter={word.letter}
        word={word.word}
        image={word.image}
        onLearn={() => onComplete(word.word)}
        onSpeak={() => speak(word.word, 0.8)}
      />
      <div className="word-nav">
        <button className="word-btn-prev" onClick={prevWord}>⬅️ Previous</button>
        <span className="word-counter">{current + 1} / {WORDS.length}</span>
        <button className="word-btn-next" onClick={nextWord}>Next ➡️</button>
      </div>
      <div className="word-progress">
        {completed.includes(word.word) ? '✅ Learned!' : '🎯 Not yet'}
      </div>
    </div>
  );
};

export default Words;
