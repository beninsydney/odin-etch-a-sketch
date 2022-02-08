window.addEventListener('load', () => {
  const oneRem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const grid = document.querySelector('.grid')
  const widthField = document.querySelector('.width')
  const heightField = document.querySelector('.height')
  const colorPicker = document.querySelector('.color-picker')
  let painting = false
  let erasing = false
  window.addEventListener('mouseup', () => {
    painting = false
  })
  grid.addEventListener('mousedown', () => {
    painting = true
  })
  grid.addEventListener('mousemove', (event) => {
    if (!painting || event.target.className !== 'paintable') {
      return
    }
    event.target.style.backgroundColor = erasing ? '' : colorPicker.value
  })
  const eraseButton = document.querySelector('.erase-button')
  eraseButton.addEventListener('click', () => {
    erasing = true
    painting = false
    eraseButton.classList.add('selected')
    paintButton.classList.remove('selected')
  })
  const paintButton = document.querySelector('.paint-button')
  paintButton.addEventListener('click', () => {
    erasing = false
    painting = false
    eraseButton.classList.remove('selected')
    paintButton.classList.add('selected')
  })
  const resetButton = document.querySelector('.reset-button')
  resetButton.addEventListener('click', reset)
  const resizeButton = document.querySelector('.resize-button')
  resizeButton.addEventListener('click', renderCanvas)
  renderCanvas()

  function reset () {
    erasing = false
    widthField.value = 16
    heightField.value = 16
    grid.innerHTML = ''
    colorPicker.value = '#000000'
    return renderCanvas()
  }

  function renderCanvas () {
    const width = parseInt(widthField.value, 10)
    const height = parseInt(heightField.value, 10)  
    grid.style.width = (width * oneRem) + 'px'
    grid.style.height = (height * oneRem) + 'px'
    const cells = width * height
    console.log('creating cells', cells)
    if (grid.children.length > cells) {
      while (grid.children.length > cells) {
        grid.removeChild(grid.lastChild)
      }
      return
    }
    if (grid.children.length < cells) {
      while (grid.children.length < cells) {
        const cell = document.createElement('div')
        cell.className = 'paintable'
        cell.style.width = oneRem + 'px'
        cell.style.height = oneRem + 'px'
        grid.appendChild(cell)
      }
    }
  }
})
