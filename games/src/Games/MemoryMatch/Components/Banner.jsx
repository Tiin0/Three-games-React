
const Banner = ({ totalFlips, resetGame }) => {
  return (
    <div className="absolute inset-0 height-[100%] flex flex-col justify-center items-center bg-gray-100 bg-opacity-90 z-50">
      <h1 className="text-4xl font-bold mb-4"> You Won!</h1>
      <p className="text-2xl mb-4">Total flips: {totalFlips}</p>
      <button
        onClick={resetGame}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Play Again
      </button>
    </div>
  );
};

export default Banner;