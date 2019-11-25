import React, { useEffect, useState } from 'react'
import BoardComponent from './components/BoardComponent'
import Axios from 'axios'

const GAME_DIFFICULTIES = {
  easy: 0,
  normal: 1,
  hard: 2,
}

const App = () => {
  const [gameId, setGameId] = useState('')
  const [gameBoard, setGameBoard] = useState([])
  const [numberOfMines, setNumberOfMines] = useState(0)
  const [gameState, setGameState] = useState('')

  // const myHookResult = useState() // typeof myHookResult === 'Array'

  // console.log(myHookResult[0]) // the "state" value; you can name this anything
  // console.log(myHookResult[1]) // the "state updater function"; you can also name this anything lol

  const checkCell = async (cellRow, cellColumn) => {
    const response = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${gameId}/check`,
      { row: cellRow, col: cellColumn }
    )

    const { data } = response
    const { id, board, state } = data // this "board" is the board data returned from the api

    setGameBoard(board)
    setGameState(state)
  }

  const flagCell = async (cellRow, cellColumn) => {
    const response = await Axios.post(
      `https://minesweeper-api.herokuapp.com/games/${gameId}/flag`,
      { row: cellRow, col: cellColumn }
    )

    const { data } = response
    const { id, board, state } = data // this "board" is the board data returned from the api

    setGameBoard(board)
    setGameState(state)
  }

  const createBoard = async () => {
    const response = await Axios.post(
      'https://minesweeper-api.herokuapp.com/games',
      { difficulty: GAME_DIFFICULTIES['easy'] }
    )

    // const id = response.data.id // dangerous

    const { data } = response
    // same as:
    // const data = response.data

    // if (!data) {
    //   return (
    //     <ErrorScreen />
    //   )
    // }

    const { id, board, mines } = data // this "board" is the board data returned from the api

    // same as:
    // const id = data.id
    // const board = data.board

    // crazy mode:
    // const {
    //   data: {
    //     id,
    //     board,
    //   },
    // } = response

    setGameId(id)
    setGameBoard(board)
    setNumberOfMines(mines)
  }
  // This runs the game automatically on component mount for now
  useEffect(() => {
    createBoard()
  }, [])

  const hasGameId = !!gameId
  const hasGameBoard = !!gameBoard.length

  if (hasGameId && hasGameBoard) {
    // render the game if its been loaded
    return (
      <BoardComponent
        flagCell={flagCell}
        checkCell={checkCell}
        board={gameBoard}
        gameId={gameId}
        gameState={gameState}
      />
    ) //{board} here is the state being passed to Board.jsx (child component). Purple can have any name. Grey board is called up above.
  } else {
    // render "alternative" screen until the game has been loaded
    return (
      <>
        <p>Game Loading!</p>
        {/* add a "create game" button and a difficulty dropdown select */}
      </>
    )
  }
}
export default App
