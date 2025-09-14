


function Menu({selectGameFunc}) {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center gap-4 flex-wrap">
      <button
      className="w-[300px] bg-amber-50 h-[300px] relative rounded-2xl cursor-pointer shrink-0"
      onClick={() => selectGameFunc('Wordle')}>
       Wordle
      </button>
      <button 
      className="w-[300px] bg-amber-50 h-[300px] relative rounded-2xl cursor-pointer shrink-0"
      onClick={() => selectGameFunc('MemoryMatch')}>
        Memory Match
      </button>
      <button 
      className="w-[300px] bg-amber-50 h-[300px] relative rounded-2xl cursor-pointer shrink-0"
      onClick={() => selectGameFunc("MathRush")}>
        Math rush
      </button>
    </div>
  )
}

export default Menu;