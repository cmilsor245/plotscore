document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.popular-reviews__reviews')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/home/popular-reviews/data.json')
    const data = await response.json()

    const articles = data.map((item, index) => {
      const review = document.createElement('article')
      review.classList.add('popular-reviews__review')

      const mainInfoSection = document.createElement('section')
      mainInfoSection.classList.add('popular-review__main-info')

      const poster = document.createElement('a')
      poster.href = '../pages/specific-media.html'
      poster.classList.add('popular-review__poster', `poster${ index + 1 }`)
      poster.style.backgroundImage = `url(${ item.lowResPosterSrc })`
      poster.dataset.highResSrc = item.highResPosterSrc
      mainInfoSection.appendChild(poster)

      if (item.hasEpisodeNumber) {
        const divEpisode = document.createElement('div')
        divEpisode.classList.add('episode')
        const pEpisode = document.createElement('p')
        const episodeNumber = item.episodeNumber < 10? `e0${ item.episodeNumber }` : `e${ item.episodeNumber }`
        pEpisode.textContent = episodeNumber.toUpperCase()
        divEpisode.appendChild(pEpisode)
        poster.appendChild(divEpisode)
      }

      /* --------------------------------------------------- */

      const mainInfoDeatils = document.createElement('section')
      mainInfoDeatils.classList.add('main-info__details')

      const userElements = document.createElement('section')
      userElements.classList.add('user-elements')

      const avatar = document.createElement('div')
      avatar.classList.add('user-elements__avatar')
      avatar.style.backgroundImage = `url(${ item.userAvatarLowRes })`
      avatar.dataset.highResSrc = item.userAvatarHighRes
      userElements.appendChild(avatar)

      const username = document.createElement('h5')
      username.classList.add('user-elements__username')
      username.textContent = item.username
      userElements.appendChild(username)

      mainInfoDeatils.appendChild(userElements)

      /* ------------ */

      const mediaDetails = document.createElement('section')
      mediaDetails.classList.add('main-info__media-details')

      const mediaTitle = document.createElement('h5')
      mediaTitle.classList.add('main-info__media-title')
      mediaTitle.innerHTML = item.title
      mediaDetails.appendChild(mediaTitle)

      mainInfoDeatils.appendChild(mediaDetails)

      /* ------------ */

      const ratingAndCommentCount = document.createElement('section')
      ratingAndCommentCount.classList.add('main-info__rating-and-comment-count')

      const rating = document.createElement('div')
      rating.classList.add('main-info__rating')

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

      ratingAndCommentCount.appendChild(rating)

      /* ------------ */

      const commentCount = document.createElement('div')
      commentCount.classList.add('main-info__comment-count')

      const commentIcon = document.createElement('i')
      commentIcon.classList.add('ti', 'ti-message')
      commentCount.appendChild(commentIcon)

      if (item.commentCount > 0) {
        const commentCountText = document.createElement('p')
        commentCountText.classList.add('main-info__comment-count-number')
        commentCountText.textContent = item.commentCount
        commentCount.appendChild(commentCountText)

        ratingAndCommentCount.appendChild(commentCount)
      }

      mainInfoDeatils.appendChild(ratingAndCommentCount)

      mainInfoSection.appendChild(mainInfoDeatils)

      /* --------------------------------------------------- */

      const reviewText = document.createElement('p')
      reviewText.classList.add('review__text')
      reviewText.innerHTML = item.text

      /* --------------------------------------------------- */

      const likesArea = document.createElement('section')
      likesArea.classList.add('review__likes-area')

      const likeReview = document.createElement('div')
      likeReview.classList.add('review__like-review')

      const likeIcon = document.createElement('i')
      likeIcon.classList.add('ti', 'ti-heart-filled')
      likeReview.appendChild(likeIcon)

      const likeAction = document.createElement('p')
      likeAction.classList.add('review__like-action')
      likeAction.textContent = 'Like review'
      likeReview.appendChild(likeAction)

      likesArea.appendChild(likeReview)

      /* ------------ */

      const likeCount = document.createElement('div')
      likeCount.classList.add('review__like-count')

      const likesNumber = document.createElement('p')
      likesNumber.classList.add('review__like-count-number')
      likesNumber.textContent = item.likeCount
      likeCount.appendChild(likesNumber)

      const likesText = document.createElement('p')
      likesText.classList.add('review__like-count-text')
      likesText.textContent = 'likes'
      likeCount.appendChild(likesText)

      likesArea.appendChild(likeCount)

      /* --------------------------------------------------- */

      review.appendChild(mainInfoSection)
      review.appendChild(reviewText)
      review.appendChild(likesArea)

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
        const poster = article.querySelector('.popular-review__poster')
        const highResSrc = poster.dataset.highResSrc
        poster.style.backgroundImage = `url(${ highResSrc })`
      })
    })

    window.addEventListener('load', () => {
      articles.forEach(article => {
        const avatar = article.querySelector('.user-elements__avatar')
        const highResSrc = avatar.dataset.highResSrc
        avatar.style.backgroundImage = `url(${ highResSrc })`
      })
    })
  } catch (error) {
    console.error('error fetching the json file', error)
  }
})
