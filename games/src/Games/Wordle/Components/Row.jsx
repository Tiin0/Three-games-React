import Cell from "./Cell"

function Row({row}) {
    return (
        <div className="flex">
            {row.map((cell, cellIndex) => (
                <Cell key={cellIndex} letter={cell.letter} status={cell.status} index={cellIndex}/>
            ))}
        </div>
    )
}

export default Row;