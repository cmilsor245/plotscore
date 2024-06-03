document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.favorite-media__media-slots')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/profile/favorite-media/data.json')
    const data = await response.json()

    const articles = data.map((item, index) => {
      const poster = document.createElement('a')
      poster.href = '../pages/specific-media.html'
      poster.classList.add('favorite-media__poster', `poster${ index + 1 }`)
      poster.style.backgroundImage = `url(${ item.lowResPosterSrc })`
      poster.dataset.highResSrc = item.highResPosterSrc

      return poster
    })

    articles.forEach(article => container.appendChild(article))

    window.addEventListener('load', () => {
      articles.forEach(article => {
        const poster = article
        const highResSrc = poster.dataset.highResSrc
        poster.style.backgroundImage = `url(${ highResSrc })`
      })
    })
  } catch (error) {
    console.error('error fetching the json file', error)
  }
})
