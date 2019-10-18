const template = document.createElement('template')
template.innerHTML = `
<style>


</style>
<div>
  <p id ='memory-game'></p>
</div>

`
class MemoryGame extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.appendAt = this.shadowRoot.querySelector('#memory-game')
    this.rows = 2
    this.cols = 2
  }

  createBoard (rows, cols) {
    this.rows = rows
    this.cols = cols
    let board = []
    const images = [1, 2, 3, 4, 5, 6, 7, 8]
    for (let i = 0; i < this.rows * this.cols / 2; i++) {
      board.push(images[i])
      board.push(images[i])
    }
    board = this.shuffleBoard(board)
    this.showBoard(board)
  }

  shuffleBoard (board) {
    for (let i = (board.length - 1); i > 0; i--) {
      const randIndex = Math.floor(board.length * Math.random())
      const temp = board[i]
      board[i] = board[randIndex]
      board[randIndex] = temp
    }
    return board
  }

  showBoard (board) {
    let i2 = 0
    for (let i = 0; i < board.length; i++) {
      const img = document.createElement('img')
      img.setAttribute('src', 'image/0.png')
      img.setAttribute('id', `${i}`)
      img.setAttribute('val', `image/${board[i]}.png`)
      this.appendAt.appendChild(img)
      i2++
      if (i2 === this.cols) {
        const breakline = document.createElement('br')
        this.appendAt.appendChild(breakline)
        i2 = 0
      }
    }
    this.playGame(board)
  }

  playGame (board) {
    let clickNum = 0
    let first
    let second
    let numHidden = 0
    for (let i = 0; i < board.length; i++) {
      const img = this.shadowRoot.getElementById(i)
      img.addEventListener('click', (event) => {
        console.log('NumHidden: ' + numHidden)
        clickNum++
        console.log(clickNum)
        if (clickNum === 1) {
          console.log('In here')
          // Show that tile
          first = event.target
          console.log(first)
          const val = first.getAttribute('val')
          first.setAttribute('src', val)
          console.log(clickNum)
          console.log(first)
          return first
        } else if (clickNum === 2 && (first.getAttribute('val') === event.target.getAttribute('val') && (first.id !== event.target.id))) {
          console.log(first)
          // Remove those tiles
          console.log(first.getAttribute('val'))
          console.log(event.target.getAttribute('val'))
          first.style.visibility = 'hidden'
          event.target.style.visibility = 'hidden'
          numHidden += 2
          if (numHidden === 8) {
            this.restartGame()
          }
          clickNum = 0
        } else if (clickNum === 2 && (first.getAttribute('val') !== event.target.getAttribute('val'))) {
          second = event.target
          console.log(second)
          const val = second.getAttribute('val')
          second.setAttribute('src', val)
          console.log(clickNum)
          console.log(second)
          return second
        } else if (clickNum === 3) {
          console.log('In here')
          first.setAttribute('src', 'image/0.png')
          second.setAttribute('src', 'image/0.png')
          clickNum = 0
        }
      })
    }
  }

  restartGame () {
    while (this.appendAt.firstChild) {
      this.appendAt.removeChild(this.appendAt.firstChild)
    }
  }
}
window.customElements.define('memory-game', MemoryGame)

export { MemoryGame }
