document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.recent-reviews__reviews-area')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/profile/recent-reviews/data.json')
    const data = await response.json()

    const articles = data.map((item, index) => {
      const review = document.createElement('article')
      review.classList.add('recent-reviews__review')

      const poster = document.createElement('a')
      poster.href = '../pages/specific-media.html'
      poster.classList.add('recent-reviews__poster', `poster${ index + 1 }`)
      poster.style.backgroundImage = `url(${ item.lowResPosterSrc })`
      poster.dataset.highResSrc = item.highResPosterSrc
      review.appendChild(poster)

      const mainInfo = document.createElement('section')
      mainInfo.classList.add('recent-reviews__main-info')

      const title = document.createElement('h4')
      title.classList.add('recent-reviews__title')
      title.innerHTML = item.title
      mainInfo.appendChild(title)

      /* ------------- */

      const rating = document.createElement('div')
      rating.classList.add('recent-reviews__rating')

      const fullStars = Math.floor(item.rating)
      const hasHalfStar = item.rating % 1 !== 0

      for (let i = 0; i < fullStars; i++) {
        const fullStar = document.createElement('i')
        fullStar.classList.add('ti', 'ti-star-filled')
        rating.appendChild(fullStar)
      }

      if (hasHalfStar) {
        const halfStar = document.createElement('i')
        halfStar.classList.add('ti', 'ti-math-1-divide-2')
        rating.appendChild(halfStar)
      }

      mainInfo.appendChild(rating)

      /* ------------- */

      const text = document.createElement('p')
      text.classList.add('recent-reviews__text')
      text.innerHTML = item.text
      mainInfo.appendChild(text)

      /* ------------- */

      const likeCount = document.createElement('div')
      likeCount.classList.add('recent-reviews__like-count')

      const icon = document.createElement('i')
      icon.classList.add('ti', 'ti-heart-filled')
      likeCount.appendChild(icon)

      if (item.likeCount > 0) {
        const count = document.createElement('p')
        count.classList.add('recent-reviews__like-count-number')
        count.textContent = `${ item.likeCount } likes`
        likeCount.appendChild(count)
      } else {
        const count = document.createElement('p')
        count.classList.add('recent-reviews__like-count-text')
        likeCount.appendChild(count)
      }

      mainInfo.appendChild(likeCount)

      review.appendChild(mainInfo)

      return review
    })

    articles.forEach((article, index) => {
      container.appendChild(article)

      if (index < articles.length - 1) {
        const divider = document.createElement('div')
        divider.classList.add('divider')
        container.appendChild(divider)
      }
    })

    window.addEventListener('load', () => {
      articles.forEach(article => {
        const poster = article.querySelector('.recent-reviews__poster')
        const highResSrc = poster.dataset.highResSrc
        poster.style.backgroundImage = `url(${ highResSrc })`
      })
    })
  } catch (error) {
    console.error('error fetching the json file', error)
  }
})
