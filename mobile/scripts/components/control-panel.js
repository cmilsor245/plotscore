const menuButton = document.querySelector('.menu-icon')

const controlPanel = document.querySelector('.control-panel')
const controlPanelOverlay = document.querySelector('.control-panel__overlay')

menuButton.addEventListener('click', () => {
  controlPanel.classList.add('open')
  controlPanel.style.transform = 'translateY(0)'
  controlPanelOverlay.classList.add('open')
})

controlPanelOverlay.addEventListener('click', () => {
  controlPanel.classList.remove('open')
  controlPanel.style.transform = 'translateY(100%)'
  controlPanelOverlay.classList.remove('open')
})

let initialY = null
let currentY = null
let yOffset = 0

const panelHeight = controlPanel.offsetHeight
const threshold = panelHeight * 0.3

controlPanel.addEventListener('touchstart', (e) => {
  initialY = e.touches[0].clientY
})

controlPanel.addEventListener('touchmove', (e) => {
  if (initialY === null) {
    return
  }

  e.preventDefault()

  currentY = e.touches[0].clientY
  yOffset = currentY - initialY

  if (yOffset > 0) {
    controlPanel.style.transform = `translateY(${yOffset}px)`
  }
})

controlPanel.addEventListener('touchend', () => {
  handleTouchEnd()
})

function handleTouchEnd() {
  if (yOffset > threshold) {
    controlPanel.style.transform = `translateY(100%)`
    controlPanelOverlay.classList.remove('open')
  } else {
    controlPanel.style.transform = 'translateY(0)'
  }

  initialY = null
  yOffset = 0
}
