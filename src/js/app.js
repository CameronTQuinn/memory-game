import './memory-game.js'
const memoryGame1 = document.createElement('memory-game')
const appendAt = document.querySelector('body')
appendAt.appendChild(memoryGame1)
memoryGame1.createBoard(4, 4)
