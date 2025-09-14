import React, { useState, createContext, useEffect } from "react";
import Card from "./Components/Card";
import Banner from './Components/Banner';

import monitor from "./cardImages/monitor.png";
import keyboard from "./cardImages/keyboard.jpg";
import mouse from "./cardImages/mouse.jpg";
import laptop from "./cardImages/laptop.jpg";
import printer from "./cardImages/printer.jpg";
import headphones from "./cardImages/headphones.jpg";
import usb from "./cardImages/usb.png";
import camera from "./cardImages/camera.jpg";

export const SelectedCardContext = createContext();

function MemoryMatch({ selectGameFunc }) {

  const cards = [
    { name: "monitor", img: monitor },
    { name: "keyboard", img: keyboard },
    { name: "mouse", img: mouse },
    { name: "laptop", img: laptop },
    { name: "printer", img: printer },
    { name: "headphones", img: headphones },
    { name: "usb-stick", img: usb },
    { name: "camera", img: camera },
  ];

  function mixGameCard() {
    let doubles = [...cards, ...cards];
    let result = [];

    while (doubles.length > 0) {
      const cardIndex = Math.floor(Math.random() * doubles.length);
      result.push(doubles[cardIndex]);
      doubles.splice(cardIndex, 1);
    }

    return result;
  }

  function restartGame() {
    setGameCards(() => mixGameCard());
    setTotalFlips(0);
    setMatched([]);
    setUserWon(false);
  }

  const [gameCards, setGameCards] = useState(() => mixGameCard());
  const [selectedCard, setSelectedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [totalFlips, setTotalFlips] = useState(0);
  const [userWon, setUserWon] = useState(false);
 
  useEffect(() => {
    if (selectedCard.length === 2) {
      const [first, second] = selectedCard;
      if (first.name === second.name) {
        setMatched((prev) => [...prev, first.name]);
        setSelectedCard([]);
      } else {
        setTimeout(() => setSelectedCard([]), 1000);
      }
    }
  }, [selectedCard]);

  useEffect(() => {
    if (matched.length === cards.length) {
      setUserWon(true);
    } 
  }, [matched])

  return (
    <div>
      <button
        className="absolute top-10 left-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition font-extrabold p-2 z-50"
        onClick={() => selectGameFunc(null)}
      >
        Back to Menu
      </button>

      <h1
        className="absolute top-10 right-10 bg-blue-500 text-white rounded hover:bg-blue-600 transition cursor-pointer font-extrabold p-2"
      >
         Total Flips: {totalFlips}
      </h1>

      <SelectedCardContext.Provider
        value={{ selectedCard, setSelectedCard, matched, setTotalFlips }}
      >
        <div className="w-full h-auto flex flex-wrap justify-center items-center gap-4 py-50 px-5 relative">
          {userWon &&  <Banner totalFlips={totalFlips} resetGame={restartGame} /> }
          {gameCards.map((card, index) => (
            <Card
              key={index}
              name={card.name}
              img={card.img}
              index={index}
            />
          ))}
        </div>
      </SelectedCardContext.Provider>
    </div>
  );
}

export default MemoryMatch;
