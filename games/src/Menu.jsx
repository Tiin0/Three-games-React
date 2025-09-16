import React, { useRef } from "react";
import wordleVideo from "./menuVideos/wordleVideo.mp4";
import memoryMatchVideo from "./menuVideos/memoryMatchVideo.mp4";
import mathRushVideo from "./menuVideos/mathRushVideo.mp4";

function Menu({ selectGameFunc }) {
  const wordleVideoPlayer = useRef(null);
  const memoryMatchVideoPlayer = useRef(null);
  const mathRushVideoPlayer = useRef(null);

  return (
    <div>
      
      <div className="w-full h-[100vh] flex justify-center items-center gap-4 flex-wrap">

      <button
        className="w-auto h-auto border-4 relative rounded-2xl cursor-pointer shrink-0"
        onClick={() => selectGameFunc("Wordle")}
      >
        <video
          width="500"
          height="300"
          muted
          loop
          ref={wordleVideoPlayer}
          onMouseOver={() => wordleVideoPlayer.current?.play()}
          onMouseOut={() => {
            if (wordleVideoPlayer.current) {
              wordleVideoPlayer.current.currentTime = 0;
              wordleVideoPlayer.current.pause();
            }
          }}
          className="rounded-2xl cursor-pointer shrink-0"
        >
          <source src={wordleVideo} type="video/mp4" />
        </video>
      </button>

      <button
        className="w-auto h-auto border-4 relative rounded-2xl cursor-pointer shrink-0"
        onClick={() => selectGameFunc("MemoryMatch")}
      >
        <video
          width="500"
          height="300"
          muted
          loop
          ref={memoryMatchVideoPlayer}
          onMouseOver={() => memoryMatchVideoPlayer.current?.play()}
          onMouseOut={() => {
            if (memoryMatchVideoPlayer.current) {
              memoryMatchVideoPlayer.current.currentTime = 0;
              memoryMatchVideoPlayer.current.pause();
            }
          }}
          className="rounded-2xl cursor-pointer shrink-0"
        >
          <source src={memoryMatchVideo} type="video/mp4" />
        </video>
      </button>

      <button
        className="w-auto border-4 h-auto relative rounded-2xl cursor-pointer shrink-0"
        onClick={() => selectGameFunc("MathRush")}
      >
        <video
          width="500"
          height="300"
          muted
          loop
          ref={mathRushVideoPlayer}
          onMouseOver={() => mathRushVideoPlayer.current?.play()}
          onMouseOut={() => {
            if (mathRushVideoPlayer.current) {
              mathRushVideoPlayer.current.currentTime = 0;
              mathRushVideoPlayer.current.pause();
            }
          }}
          className="rounded-2xl cursor-pointer shrink-0"
        >
          <source src={mathRushVideo} type="video/mp4" />
        </video>
      </button>
    </div>
    </div>
    
  );
}

export default Menu;
