document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.new-releases--media-slots')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/home/new-releases/data.json')
    const data = await response.json()

    const articles = data.map((item, index) => {
      const article = document.createElement('a')
      article.href = '../pages/specific-media.html'
      article.classList.add('new-releases__slot')

      const section = document.createElement('section')
      section.classList.add('poster', `poster${ index + 1 }`)
      section.style.backgroundImage = `url(${ item.lowResPosterSrc })`
      section.dataset.highResSrc = item.highResPosterSrc

      if (item.hasEpisodeNumber) {
        const divEpisode = document.createElement('div')
        divEpisode.classList.add('episode')
        const pEpisode = document.createElement('p')
        const episodeNumber = item.episodeNumber < 10 ? `e0${ item.episodeNumber }` : `e${ item.episodeNumber }`
        pEpisode.textContent = episodeNumber.toUpperCase()
        divEpisode.appendChild(pEpisode)
        section.appendChild(divEpisode)
      }

      const divDate = document.createElement('div')
      divDate.classList.add('date')
      const pDate = document.createElement('p')
      pDate.textContent = item.releaseDate
      divDate.appendChild(pDate)

      article.appendChild(section)
      article.appendChild(divDate)

      return article
    })

    articles.forEach(article => container.appendChild(article))

    window.addEventListener('load', () => {
      articles.forEach(article => {
        const section = article.querySelector('.poster')
        const highResSrc = section.dataset.highResSrc
        section.style.backgroundImage = `url(${ highResSrc })`
      })
    })
  } catch (error) {
    console.error('error fetching the json file', error)
  }
})
