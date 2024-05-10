import { useEffect, useState } from 'react'

import {
  IconMath1Divide2,
  IconStarFilled,
  IconMessage,
  IconHeartFilled
} from '@tabler/icons-react'

import translate from '/src/app/translation.js'
import MediaSlot from '/components/common/media-slot.js'

import '/styles/components/common/review.css'

function ReviewWithoutPoster({
  lang,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  rating,

  reviewText,

  hasCommentCount,
  commentCount,

  likeCount,
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const avatarImage = new Image()
    avatarImage.src = avatarHighResImgSrc
    avatarImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const avatarStyle = {
    backgroundImage: `url(${ imageLoaded ? avatarHighResImgSrc : avatarLowResImgSrc })`
  }

  /* ---------------------------- */

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1!== 0
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key = { i } className = 'review--without-poster--details--star'>
        <IconStarFilled />
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key = { fullStars } className = 'review--without-poster--details--star-half'>
        <IconMath1Divide2 />
      </span>
    )
  }

  return (
    <div className = 'review--without-poster'>
      <div className = 'review--without-poster--avatar' style = { avatarStyle }></div>

      <article className = 'review--without-poster--details'>
        <section className = 'review--without-poster--details--user-rating-and-comments'>
          <h6 className = 'review--without-poster--details--user'>
            { translate(lang, 'SPECIFIC_MEDIA', 'REVIEW', 'REVIEW_BY') } <span>{ username }</span>
          </h6>

          <div className = 'review--without-poster--details--rating'>
            { stars }
          </div>

          { hasCommentCount && (
            <span className = 'review--without-poster--details--comments'>
              <IconMessage />
              { commentCount }
            </span>
          ) }
        </section>

        <p className = 'review--without-poster--details--text'>
          { reviewText }
        </p>

        <section className = 'review--without-poster--details--likes'>
          <span className = 'action'>
            <IconHeartFilled />
            { translate(lang, 'SPECIFIC_MEDIA', 'REVIEW', 'LIKE_ACTION') }
          </span>
          <span className = 'count'>{ likeCount } likes</span>
        </section>
      </article>
    </div>
  )
}

/* --------------------------------------------- */

function VerticalReview() {
  return (
    <>
      
    </>
  )
}

/* --------------------------------------------- */

function HorizontalReviewType1() {
  return (
    <>
      
    </>
  )
}

/* --------------------------------------------- */

function HorizontalReviewType2() {
  return (
    <>
      
    </>
  )
}

/* ------------------------------------------------------------------------------------------------ */

export default function Review({
  lang,

  hasPoster,
  posterLowResImgSrc,
  posterHighResImgSrc,

  mediaTitle,
  mediaYear,

  hasAvatar,
  avatarLowResImgSrc,
  avatarHighResImgSrc,
  hasUsername,
  username,

  rating,

  hasText,
  reviewText,

  hasCommentCount,
  commentCount,

  hasLikeCount,
  likeCount,

  hasWatched_RewatchedMessage,
  hasWatchedBefore,

  type
}) {
  let conditionalReview

  switch (hasPoster) {
    case false:
      conditionalReview = 
        <ReviewWithoutPoster
          lang = { lang }

          avatarLowResImgSrc = { avatarLowResImgSrc }
          avatarHighResImgSrc = { avatarHighResImgSrc }
          username = { username }

          rating = { rating }

          reviewText = { reviewText }

          hasCommentCount = { hasCommentCount }
          commentCount = { commentCount }

          likeCount = { likeCount }
        />
      break

      /* ------------------------------------------ */

    case true:
      switch (type) {
        case 'vertical':
          conditionalReview = <VerticalReview />
          break
        case 'horizontal-1':
          conditionalReview = <HorizontalReviewType1 />
          break
        case 'horizontal-2':
          conditionalReview = <HorizontalReviewType2 />
          break
      }
      break
  }

  return (
    <>
      { conditionalReview }
    </>
  )
}
