import React, { useState } from 'react';
import Menu from "./Menu";
import Wordle from './Games/Wordle/Wordle';
import MemoryMatch from './Games/MemoryMatch/MemoryMatch';
import MathRush from './Games/MathRush/MathRush';

function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  function selectGame(newGame) {
    setSelectedGame(newGame);
  }

  return (
    <div className='bg-blue-100'>
      {selectedGame === null && <Menu selectGameFunc={selectGame}/>}
      {selectedGame === 'Wordle' && <Wordle selectGameFunc={selectGame} />}
      {selectedGame === 'MemoryMatch' && <MemoryMatch selectGameFunc={selectGame} />}
      {selectedGame === 'MathRush' && <MathRush selectGameFunc={selectGame} />}
    </div>
  );
}

export default App;
