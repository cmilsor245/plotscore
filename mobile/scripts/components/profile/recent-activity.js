document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.recent-activity__media-slots')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/profile/recent-activity/data.json')
    const data = await response.json()

    const articles = data.map((item, index) => {
      const poster = document.createElement('a')
      poster.href = '../pages/specific-media.html'
      poster.classList.add('recent-activity__poster', `poster${ index + 1 }`)
      poster.style.backgroundImage = `url(${ item.lowResPosterSrc })`
      poster.dataset.highResSrc = item.highResPosterSrc

      if (item.hasEpisodeNumber) {
        const divEpisode = document.createElement('div')
        divEpisode.classList.add('episode')
        const pEpisode = document.createElement('p')
        const episodeNumber = item.episodeNumber < 10 ? `e0${ item.episodeNumber }` : `e${ item.episodeNumber }`
        pEpisode.textContent = episodeNumber.toUpperCase()
        divEpisode.appendChild(pEpisode)
        poster.appendChild(divEpisode)
      }

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
