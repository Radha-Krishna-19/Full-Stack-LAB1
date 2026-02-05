import React, { useState } from 'react';
import { speak } from './utils/speechUtils';
import './Assessment.css';

const questionsPool = {
  A: [
    { question: "What letter does 'Apple' start with?", answer: "A" },
    { question: "Name a word that starts with A", answer: "Apple" },
    { question: "What is the first letter of the alphabet?", answer: "A" }
  ],
  B: [
    { question: "What letter does 'Ball' start with?", answer: "B" },
    { question: "Name a word that starts with B", answer: "Ball" },
    { question: "What letter comes after A?", answer: "B" }
  ],
  C: [
    { question: "What letter does 'Cat' start with?", answer: "C" },
    { question: "Name a word that starts with C", answer: "Cat" },
    { question: "What letter comes after B?", answer: "C" }
  ],
  D: [
    { question: "What letter does 'Dog' start with?", answer: "D" },
    { question: "Name a word that starts with D", answer: "Dog" },
    { question: "What letter comes after C?", answer: "D" }
  ],
  E: [
    { question: "What letter does 'Elephant' start with?", answer: "E" },
    { question: "Name a word that starts with E", answer: "Elephant" },
    { question: "What letter comes after D?", answer: "E" }
  ],
  F: [
    { question: "What letter does 'Fish' start with?", answer: "F" },
    { question: "Name a word that starts with F", answer: "Fish" },
    { question: "What letter comes after E?", answer: "F" }
  ],
  G: [
    { question: "What letter does 'Giraffe' start with?", answer: "G" },
    { question: "Name a word that starts with G", answer: "Giraffe" },
    { question: "What letter comes after F?", answer: "G" }
  ],
  H: [
    { question: "What letter does 'House' start with?", answer: "H" },
    { question: "Name a word that starts with H", answer: "House" },
    { question: "What letter comes after G?", answer: "H" }
  ],
  I: [
    { question: "What letter does 'Ice Cream' start with?", answer: "I" },
    { question: "Name a word that starts with I", answer: "Ice Cream" },
    { question: "What letter comes after H?", answer: "I" }
  ],
  J: [
    { question: "What letter does 'Jellyfish' start with?", answer: "J" },
    { question: "Name a word that starts with J", answer: "Jellyfish" },
    { question: "What letter comes after I?", answer: "J" }
  ],
  K: [
    { question: "What letter does 'Kite' start with?", answer: "K" },
    { question: "Name a word that starts with K", answer: "Kite" },
    { question: "What letter comes after J?", answer: "K" }
  ],
  L: [
    { question: "What letter does 'Lion' start with?", answer: "L" },
    { question: "Name a word that starts with L", answer: "Lion" },
    { question: "What letter comes after K?", answer: "L" }
  ],
  M: [
    { question: "What letter does 'Monkey' start with?", answer: "M" },
    { question: "Name a word that starts with M", answer: "Monkey" },
    { question: "What letter comes after L?", answer: "M" }
  ],
  N: [
    { question: "What letter does 'Nose' start with?", answer: "N" },
    { question: "Name a word that starts with N", answer: "Nose" },
    { question: "What letter comes after M?", answer: "N" }
  ],
  O: [
    { question: "What letter does 'Orange' start with?", answer: "O" },
    { question: "Name a word that starts with O", answer: "Orange" },
    { question: "What letter comes after N?", answer: "O" }
  ],
  P: [
    { question: "What letter does 'Penguin' start with?", answer: "P" },
    { question: "Name a word that starts with P", answer: "Penguin" },
    { question: "What letter comes after O?", answer: "P" }
  ],
  Q: [
    { question: "What letter does 'Queen' start with?", answer: "Q" },
    { question: "Name a word that starts with Q", answer: "Queen" },
    { question: "What letter comes after P?", answer: "Q" }
  ],
  R: [
    { question: "What letter does 'Rainbow' start with?", answer: "R" },
    { question: "Name a word that starts with R", answer: "Rainbow" },
    { question: "What letter comes after Q?", answer: "R" }
  ],
  S: [
    { question: "What letter does 'Sun' start with?", answer: "S" },
    { question: "Name a word that starts with S", answer: "Sun" },
    { question: "What letter comes after R?", answer: "S" }
  ],
  T: [
    { question: "What letter does 'Tiger' start with?", answer: "T" },
    { question: "Name a word that starts with T", answer: "Tiger" },
    { question: "What letter comes after S?", answer: "T" }
  ],
  U: [
    { question: "What letter does 'Umbrella' start with?", answer: "U" },
    { question: "Name a word that starts with U", answer: "Umbrella" },
    { question: "What letter comes after T?", answer: "U" }
  ],
  V: [
    { question: "What letter does 'Violin' start with?", answer: "V" },
    { question: "Name a word that starts with V", answer: "Violin" },
    { question: "What letter comes after U?", answer: "V" }
  ],
  W: [
    { question: "What letter does 'Whale' start with?", answer: "W" },
    { question: "Name a word that starts with W", answer: "Whale" },
    { question: "What letter comes after V?", answer: "W" }
  ],
  X: [
    { question: "What letter does 'Xylophone' start with?", answer: "X" },
    { question: "Name a word that starts with X", answer: "Xylophone" },
    { question: "What letter comes after W?", answer: "X" }
  ],
  Y: [
    { question: "What letter does 'Yo-yo' start with?", answer: "Y" },
    { question: "Name a word that starts with Y", answer: "Yo-yo" },
    { question: "What letter comes after X?", answer: "Y" }
  ],
  Z: [
    { question: "What letter does 'Zebra' start with?", answer: "Z" },
    { question: "Name a word that starts with Z", answer: "Zebra" },
    { question: "What letter comes after Y?", answer: "Z" }
  ]
};

const Assessment = ({ completed, onComplete }) => {
  const [numAlphabets, setNumAlphabets] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState('');
  const [questionsGenerated, setQuestionsGenerated] = useState(false);

  const generateQuestions = (num) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, num);
    const allQuestions = [];
    letters.split('').forEach(letter => {
      if (questionsPool[letter]) {
        allQuestions.push(...questionsPool[letter].map(q => ({ ...q, letter })));
      }
    });
    // Randomly select 3 questions
    const shuffled = allQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleNumAlphabetsSubmit = (e) => {
    e.preventDefault();
    if (numAlphabets && numAlphabets > 0 && numAlphabets <= 26) {
      const questions = generateQuestions(parseInt(numAlphabets));
      setSelectedQuestions(questions);
      setQuestionsGenerated(true);
      speak(`Great! You know ${numAlphabets} alphabets. Now answer these 3 questions!`, 0.8);
      setFeedback(`✅ Generated 3 questions from the first ${numAlphabets} alphabets!`);
      onComplete(`Knows ${numAlphabets} alphabets`);
    } else {
      setFeedback('❌ Please enter a number between 1 and 26');
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    let correct = 0;
    selectedQuestions.forEach((q, i) => {
      const userAnswer = answers[i] || '';
      if (userAnswer.toLowerCase().trim() === q.answer.toLowerCase()) {
        correct++;
      }
    });
    setFeedback(`✅ You got ${correct} out of ${selectedQuestions.length} questions right!`);
    speak(`You answered ${correct} questions correctly!`, 0.8);
  };

  return (
    <div className="assessment">
      <h2>📝 Quick Assessment</h2>
      
      {!questionsGenerated && (
        <form onSubmit={handleNumAlphabetsSubmit} className="form-section">
          <label>How many alphabets do you know?</label>
          <input
            type="number"
            value={numAlphabets}
            onChange={(e) => setNumAlphabets(e.target.value)}
            placeholder="Enter number (1-26)"
            min="1"
            max="26"
          />
          <button type="submit">Generate Questions</button>
        </form>
      )}

      {questionsGenerated && (
        <form onSubmit={handleAnswerSubmit} className="form-section">
          <h3>Answer these questions:</h3>
          {selectedQuestions.map((q, i) => (
            <div key={i} className="question">
              <label>{q.question}</label>
              <input
                type="text"
                value={answers[i] || ''}
                onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                placeholder="Your answer"
              />
            </div>
          ))}
          <button type="submit">Check Answers</button>
        </form>
      )}

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default Assessment;