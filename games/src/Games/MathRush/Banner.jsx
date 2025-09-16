function Banner({score, resetGame}) {
    return (
      <div className='absolute flex flex-col justify-center items-center w-full h-[100vh] bg-gray-100'>
        <h1 className='text-4xl font-bold mb-4'>Game Over</h1>
        <p className='text-2xl'>Score: {score}</p>
        <button
          onClick={() => {
            resetGame()
          }}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
        >
          Restart
        </button>
      </div>
    );
}

export default Banner;