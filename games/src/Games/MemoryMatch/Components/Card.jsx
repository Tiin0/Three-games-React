import { useContext, useEffect } from "react";
import CardCover from "../cardImages/cardCover.png";
import { SelectedCardContext } from "../MemoryMatch";

function Card({ name, img, index }) {
  const { selectedCard, setSelectedCard, matched, setTotalFlips } = useContext(SelectedCardContext);

  const isFlipped = selectedCard.some((c) => c.index === index) || matched.includes(name);

  useEffect(() => {
    if (isFlipped) {
      setTotalFlips((prev) => prev + 1);
    }
  }, [isFlipped]);

  function handleClick() {
    if (selectedCard.length < 2 && !isFlipped) {
      setSelectedCard([...selectedCard, { name, index }]);
    }
  }

  return (
    <div
      className="w-[200px] h-[300px] cursor-pointer [perspective:1000px]"
      onClick={handleClick}
    >
     <div
        className={`relative w-full h-full transition-transform duration-500 border-2 rounded-2xl`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        
       <div
          className="absolute w-full h-full rounded-xl bg-cover bg-center border-2"
          style={{
            backgroundImage: `url(${CardCover})`,
            backfaceVisibility: "hidden",
          }}
        ></div>

        <img
        src={img}
        className="absolute w-full h-full rounded-xl object-contain object-center bg-white"
        style={{
          transform: "rotateY(180deg)",
          backfaceVisibility: "hidden",
        }}
      />


      </div>
    </div>
  );
}

export default Card;
