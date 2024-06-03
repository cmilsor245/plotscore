document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.popular-reviews__reviews-area')

  if (!container) {
    console.error('container not found')
    return
  }

  try {
    const response = await fetch('../components/specific-media/popular-reviews/data.json')
    const data = await response.json()

    const reviews = data.map((item, index) => {
      const review = document.createElement('article')
      review.classList.add('popular-reviews__review')

      const avatar = document.createElement('div')
      avatar.classList.add('popular-review__avatar', `avatar${ index + 1 }`)
      avatar.style.backgroundImage = `url(${ item.lowResAvatarSrc })`
      avatar.dataset.highResSrc = item.highResAvatarSrc
      review.appendChild(avatar)

      /* --------------------------------------- */

      const details = document.createElement('section')
      details.classList.add('popular-review__details')

      const usernameRatingComments = document.createElement('div')
      usernameRatingComments.classList.add('popular-review__username-rating-comments')

      const username = document.createElement('h5')
      username.classList.add('popular-review__username')
      username.innerHTML = `Review by <span>${ item.username }</span>`
      usernameRatingComments.appendChild(username)

      /* ----------- */

      const rating = document.createElement('div')
      rating.classList.add('popular-review__rating')

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

      usernameRatingComments.appendChild(rating)

      /* ----------- */

      if (item.commentCount > 0) {
        const commentCount = document.createElement('div')
        commentCount.classList.add('popular-review__comment-count')

        const commentIcon = document.createElement('i')
        commentIcon.classList.add('ti', 'ti-message')
        commentCount.appendChild(commentIcon)


        if (item.commentCount > 0) {
          const commentCountText = document.createElement('p')
          commentCountText.classList.add('popular-review__comment-count-number')
          commentCountText.textContent = item.commentCount
          commentCount.appendChild(commentCountText)
        }

        usernameRatingComments.appendChild(commentCount)
      }

      details.appendChild(usernameRatingComments)

      /* ----------- */

      const text = document.createElement('p')
      text.classList.add('popular-review__text')
      text.innerHTML = item.text
      details.appendChild(text)

      /* ----------- */

      const likesArea = document.createElement('section')
      likesArea.classList.add('popular-review__likes-area')

      const likeReview = document.createElement('div')
      likeReview.classList.add('popular-review__like-review')

      const likeIcon = document.createElement('i')
      likeIcon.classList.add('ti', 'ti-heart-filled')
      likeReview.appendChild(likeIcon)

      const likeAction = document.createElement('p')
      likeAction.classList.add('popular-review__like-action')
      likeAction.textContent = 'Like review'
      likeReview.appendChild(likeAction)

      likesArea.appendChild(likeReview)

      /* ----------- */

      if (item.likeCount > 0) {
        const likeCount = document.createElement('div')
        likeCount.classList.add('popular-review__like-count')

        const likesNumber = document.createElement('p')
        likesNumber.classList.add('popular-review__like-count-number')
        likesNumber.textContent = item.likeCount
        likeCount.appendChild(likesNumber)

        const likesText = document.createElement('p')
        likesText.classList.add('popular-review__like-count-text')
        likesText.textContent = 'likes'
        likeCount.appendChild(likesText)

        likesArea.appendChild(likeCount)
      }

      details.appendChild(likesArea)

      /* ----------------------------------- */

      review.appendChild(details)

      return review
    })

    reviews.forEach((review, index) => {
      container.appendChild(review)

      if (index < reviews.length - 1) {
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
  } catch (error) {
    console.error('error fetching the json file', error)
  }
})
