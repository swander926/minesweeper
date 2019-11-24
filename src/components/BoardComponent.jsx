import React from 'react'

import CellComponent from './CellComponent'

const BoardComponent = props => {
  const { board, checkCell, flagCell, gameState } = props

  /**
   * "board" is a 2-dimensional array
   * the "outer" array represents the "rows"
   * and the "inner" arrays represent the "columns"
   */

  // option 1
  // const renderCell = (cell, index) => {
  //   console.log(`This is the ${index + 1}th row!`)

  //   return (
  //     <div className="cell">
  //       <div></div>
  //     </div>
  //   )
  // }

  // option 2
  // ...import from other file, "Cell"

  const renderRow = (row, indexRow) => {
    // option 1
    // return <div className="row">{row.map(renderCell)}</div>

    // option 2
    return (
      <div className="row" key={indexRow}>
        {row.map((cell, indexColumn) => {
          return (
            <CellComponent
              key={indexColumn}
              checkCell={checkCell}
              flagCell={flagCell}
              cell={cell}
              row={indexRow}
              column={indexColumn}
              gameState={gameState}
            />
          )
        })}
      </div>
    )
  }

  return <div className="board">{board.map(renderRow)}</div>
}

export default BoardComponent
