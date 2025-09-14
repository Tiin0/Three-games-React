import React, { useState, useEffect, useRef } from 'react';

const MathRush = ({selectGameFunc}) => {
  const [maxRandomNum, setMaxRandomNum] = useState(5);
  const [numberOfNums, setNumberOfNums] = useState(2);
  const [difficulty, setDifficulty] = useState('easy');
  const [operationDisplay, setOperationDisplay] = useState('');
  const [correctResult, setCorrectResult] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const timerRef = useRef(null);
  const simbols = ['+', '-', '*', '/'];

  function getOperation() {
    const newNums = [];
    for (let i = 0; i < numberOfNums; i++) {
      newNums.push(Math.floor(Math.random() * maxRandomNum) + 1);
    }

    const operation = [newNums[0]];
    for (let i = 1; i < newNums.length; i++) {
      let simbolSelected = simbols[Math.floor(Math.random() * simbols.length)];

      if (simbolSelected === '/') {
        let a = operation[operation.length - 1];
        let b = newNums[i];
        if (b === 0) b = 1;
        if (a < b) [a, b] = [b, a];
        operation[operation.length - 1] = a;
        newNums[i] = b;
      }

      operation.push(simbolSelected);
      operation.push(newNums[i]);
    }

    return operation;
  }

  const calc = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b 
  };

  function computeWithPrecedence(operation) {
    let ops = [...operation];
    let i = 0;

    while (i < ops.length) {
      if (ops[i] === '*' || ops[i] === '/') {
        const res = calc[ops[i]](ops[i - 1], ops[i + 1]);
        ops.splice(i - 1, 3, res);
        i = 0;
      } else {
        i++;
      }
    }

    let result = ops[0];
    i = 1;
    while (i < ops.length) {
      const op = ops[i];
      result = calc[op](result, ops[i + 1]);
      i += 2;
    }

    return Math.round(result * 100) / 100;
  }

  function generateQuestion() {
    const operation = getOperation();
    const res = computeWithPrecedence(operation);

    setOperationDisplay(operation.join(' '));
    setCorrectResult(res);
    setUserAnswer('');
    setTimeLeft(getInitialTime());
  }

  function getInitialTime() {
    if (difficulty === 'easy') return 10;
    if (difficulty === 'medium') return 8;
    return 6;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answer = parseFloat(userAnswer.replace(',', '.'));
    if (answer === correctResult) {
      setScore(score + 1);

      if ((score + 1) % 5 === 0) {
        if (difficulty === 'easy') {
          setDifficulty('medium');
          setMaxRandomNum(10);
          setNumberOfNums(3);
        } else if (difficulty === 'medium') {
          setDifficulty('hard');
          setMaxRandomNum(15);
          setNumberOfNums(4);
        }
      }

      generateQuestion();
    } else {
      setGameOver(true);
      clearInterval(timerRef.current);
    }
  }

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [correctResult]);

  if (gameOver) {
    return (
      <div className='flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100'>
        <h1 className='text-4xl font-bold mb-4'>Game Over</h1>
        <p className='text-2xl'>Score: {score}</p>
        <button
          onClick={() => {
            setScore(0);
            setDifficulty('easy');
            setMaxRandomNum(5);
            setNumberOfNums(2);
            setGameOver(false);
            generateQuestion();
          }}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
        >
          Restart
        </button>
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100'>
      <button
        className="absolute top-10 left-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-extrabold p-2 cursor-pointer"
        onClick={() => selectGameFunc(null)}
      >
        Back to Menu
      </button>

      <h1 className='absolute top-4 left-[50%] -translate-x-1/2 text-3xl font-extrabold'>
        Difficulty: {difficulty}
      </h1>
      <h2 className='absolute top-16 left-[50%] -translate-x-1/2 text-2xl font-semibold'>
        Score: {score}
      </h2>
      <h3 className='absolute top-24 left-[50%] -translate-x-1/2 text-xl font-medium'>
        Time Left: {timeLeft}s
      </h3>

      <div className='flex flex-col justify-center items-center gap-4 p-4 mt-20'>
        <div className='text-2xl font-bold'>Operation: {operationDisplay}</div>

        <form onSubmit={handleSubmit} className='flex gap-2'>
          <input
            type='text'
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className='px-2 py-1 rounded border border-gray-400'
            autoFocus
          />
          <button
            type='submit'
            className='px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MathRush;
