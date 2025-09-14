import React from 'react';
import Row from './Row';
import Cell from './Cell';

function Grid({ grid }) {
  return (
    <div>
      {grid.map((row, rowIndex) => (
          <Row key={rowIndex} row={row}/>
      ))}
    </div>
  )
}

export default Grid;
