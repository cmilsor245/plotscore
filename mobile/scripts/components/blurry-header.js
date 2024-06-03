document.addEventListener('DOMContentLoaded', () => {
  const blurryHeader = document.querySelector('.blurry-header')

  const observerOptions = {
    root: null,
    rootMargin: '-300px',
    threshold: 0
  }

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        blurryHeader.classList.add('blurry')
      } else {
        blurryHeader.classList.remove('blurry')
      }
    })
  }

  const observer = new IntersectionObserver(observerCallback, observerOptions)

  const triggerElement = document.querySelector('.page__content > section')
  if (triggerElement) {
    observer.observe(triggerElement)
  } else {
    console.error('trigger element not found')
  }
})
