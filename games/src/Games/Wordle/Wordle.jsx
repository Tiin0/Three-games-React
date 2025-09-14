import { useEffect, useReducer, useState } from "react";
import Grid from "./Components/Grid";
import wordsList from "./words.json";
import Banner from './Components/Banner';

const initialState = {
  grid: Array(6).fill(null).map(() => Array(5).fill(null).map(() => ({ letter: "", status: "" })))
};

function reducer(state, action) {
  switch (action.type) {
    case "ADDLETTER": {
      const gridCopy = state.grid.map(row => row.map(cell => ({ ...cell })));
      gridCopy[action.row][action.col].letter = action.payload;
      return { ...state, grid: gridCopy };
    }
    case "DELETELETTER": {
      const gridCopy = state.grid.map(row => row.map(cell => ({ ...cell })));
      gridCopy[action.row][action.col].letter = "";
      return { ...state, grid: gridCopy };
    }
    case "SUBMIT": {
      const gridCopy = state.grid.map(row => row.map(cell => ({ ...cell })));
      const userInput = action.payload.toUpperCase();
      const secret = action.secretWord.toUpperCase();

      for (let i = 0; i < 5; i++) {
        const letter = userInput[i];
        if (letter === secret[i]) {
          gridCopy[action.row][i].status = "right";
        } else if (secret.includes(letter)) {
          gridCopy[action.row][i].status = "present";
        } else {
          gridCopy[action.row][i].status = "wrong";
        }
      }
      return { ...state, grid: gridCopy };
    }
    case 'RESET': {
      const newGrid = Array(6).fill(null).map(() => Array(5).fill(null).map(() => ({ letter: "", status: "" })));
      return { ...state, grid: newGrid };
    }
    default:
      return state;
  }
}

function Wordle({selectGameFunc}) {
  const [grid, dispatch] = useReducer(reducer, initialState);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [secretWord, setSecretWord] = useState("");
  const [freeze, setFreeze] = useState(false);
  const [input, setInput] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const wordIndex = Math.floor(Math.random() * wordsList.length);
    setSecretWord(wordsList[wordIndex].toUpperCase());
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [secretWord, currentRow, currentCol]);

  function handleKeyDown(e) {
    if (freeze) {
      return
    };

    const key = e.key.toUpperCase();

    if (key === "BACKSPACE") {
      if (currentCol === 0) return;
      setInput((prev) => prev.slice(0,-1));
      const newCol = currentCol - 1;
      dispatch({ 
        type: "DELETELETTER", 
        row: currentRow, 
        col: newCol });
      setCurrentCol(newCol);
    } else if (key === "ENTER") {
      if (input.length < 5) return;

      const isWordInList = wordsList.findIndex((word) => word === input.toLowerCase());
      if (isWordInList === -1) {
        setAlert(true);
        setTimeout(() => setAlert(false),1500);
        return;
      };

     dispatch({ 
      type: "SUBMIT",
      payload: input, 
      row: currentRow, 
      secretWord
    });
    if (input === secretWord || currentRow === 5) {
      setFreeze(true);
    } else {
      setCurrentRow(prev => prev + 1);
      setCurrentCol(0);
      setInput('');
    }
    } else if (key >= "A" && key <= "Z") {
      if (input.length === 5) return;
      setInput((prev) => prev + key);
      dispatch({
        type: "ADDLETTER",
        payload: key,
        row: currentRow,
        col: currentCol
      });
      setCurrentCol(prev => prev + 1);
    }
  }

  function restartGame() {
    dispatch({ type: "RESET" });
    setCurrentRow(0);
    setCurrentCol(0);
    setInput('');
    setFreeze(false);
    const wordIndex = Math.floor(Math.random() * wordsList.length);
    setSecretWord(wordsList[wordIndex].toUpperCase());
  }


  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100">
      <button 
      className="absolute top-10 left-10 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer"
      onClick={() => selectGameFunc(null)}>
        Back to Menu
      </button>
      {alert && <div className="text-red-600 h-[50px] w-auto font-extrabold mt-5">Word not in List!</div>}
      <Grid grid={grid.grid} />
      {freeze && <Banner userWon={input === secretWord ? true : false} resetGame={restartGame} secretWord={secretWord}/>}
    </div>
  );
}

export default Wordle;
