

function Cell({letter, status, index}) {
    let bg= '';
    if (status === 'right') {
        bg = 'bg-green-300';
    } else if (status === 'present') {
        bg = 'bg-yellow-300';
    } else if (status === 'wrong') {
        bg = 'bg-slate-300'
    } else {
        bg ='bg-white'
    }

    return (
        <div className={`w-[50px] h-[50px] p-2 border flex items-center justify-center ${bg} ${status ? 'flip' : ''}`} style={{ animationDelay: `${index * 0.2}s` }}>
            {letter}
        </div>
    )
}

export default Cell;