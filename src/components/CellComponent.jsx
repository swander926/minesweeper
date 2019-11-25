import React from 'react'

const CellComponent = props => {
  const { cell, row, column, checkCell, flagCell, gameState } = props

  const gameIsOver = ['won', 'lost'].includes(gameState)
  // const gameIsOver = (gameState === 'won') || (gameState === 'lost') -- option 2

  // taken from stack overflow lol
  const handleCellClick = event => {
    event.preventDefault()

    if (!gameIsOver) {
      if (event.type === 'click') {
        // left click
        checkCell(row, column)
      } else if (event.type === 'contextmenu') {
        // right click
        flagCell(row, column)
      }
    }
  }

  /**
   * potential "cell" values:
   * " " -> unrevealed
   * "_" -> empty, revealed
   * "F" -> unrevealed, flagged
   * "*" -> cell with bomb (DISPLAY AFTER GAME)
   * "@" -> flagged cell with bomb (DISPLAY AFTER GAME)
   * "1-8" -> number of neighboring cells containing mines
   */

  const isNumber = typeof cell === 'number'

  if (gameIsOver) {
    if (cell === '@') {
      return (
        <div className="cell flagged-bomb">
          <h6 className="cell-item">🚩</h6>
        </div>
      )
    }

    if (cell === '*') {
      return (
        <div className="cell missed-bomb">
          <h6 className="cell-item">💣</h6>
        </div>
      )
    }

    if (cell === 'F') {
      return (
        <button className="cell incorrectly-flagged">
          <h6 className="cell-item">🐢</h6>
        </button>
      )
    }
  }

  if (cell === ' ') {
    return (
      <div
        onContextMenu={handleCellClick}
        onClick={handleCellClick}
        className="cell unrevealed"
      >
        <h6 className="cell-item"> </h6>
      </div>
    )
  }

  if (cell === '_' || isNumber) {
    return (
      <div className="cell revealed">
        <h6 className="cell-item">{isNumber ? cell : ' '}</h6>
        {/* // - Ternary - If true, it will return
        first value. If false, it will return second value. */}
      </div>
    )
  }

  if (cell === 'F') {
    return (
      <button className="cell flagged">
        <h6 className="cell-item">🚩</h6>
      </button>
    )
  }

  // theoretically this should not be reached 🤔
  return (
    <>
      <div className="cell">
        <h6 className="cell-item"> </h6>
      </div>
    </>
  )
}

export default CellComponent
