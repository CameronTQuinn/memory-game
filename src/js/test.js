
const createBoard = function (rows, cols) {
  let board = []
  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  for (let i = 0; i < rows * cols / 2; i++) {
    board.push(images[i])
    board.push(images[i])
  }
  board = shuffleBoard(board)
  return board
}

const shuffleBoard = function (board) {
  for (let i = (board.length - 1); i > 0; i--) {
    const randIndex = Math.floor(board.length * Math.random())
    const temp = board[i]
    board[i] = board[randIndex]
    board[randIndex] = temp
  }
  return board
}

createBoard(2, 4)
