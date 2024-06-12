import { useEffect, useState } from 'react'

import {
  IconHeartFilled,
  IconMath1Divide2,
  IconMessage,
  IconStarFilled
} from '@tabler/icons-react'

import MediaSlot from '/components/common/media-slot.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/review.css'

function ReviewWithoutPoster({
  lang,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  rating,

  reviewText,

  commentCount,
  likeCount,
}) {
  const [avatarLoaded, setAvatarLoaded] = useState(false)

  useEffect(() => {
    const avatarImage = new Image()
    avatarImage.src = avatarHighResImgSrc
    avatarImage.onload = () => {
      setAvatarLoaded(true)
    }
  })

  const avatarStyle = {
    backgroundImage: `url(${ avatarLoaded ? avatarHighResImgSrc : avatarLowResImgSrc })`
  }

  /* ---------------------------- */

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key = { i } className = 'review--without-poster__star'>
        <IconStarFilled />
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key = { fullStars } className = 'review--without-poster__star--half'>
        <IconMath1Divide2 />
      </span>
    )
  }

  return (
    <div className = 'review--without-poster'>
      <div className = 'review--without-poster__avatar' style = { avatarStyle }></div>

      <article className = 'review--without-poster__details'>
        <section className = 'review--without-poster__user-rating-comments'>
          <h6 className = 'review--without-poster__user'>
            { translate(lang, 'SPECIFIC_MEDIA', 'REVIEW', 'REVIEW_BY') } <span>{ username }</span>
          </h6>

          <div className = 'review--without-poster__rating'>
            { stars }
          </div>

          { commentCount > 0 && (
            <span className = 'review--without-poster__comments'>
              <IconMessage />
              { commentCount }
            </span>
          ) }
        </section>

        <p className = 'review--without-poster__text'>
          { reviewText }
        </p>

        <section className = 'review--without-poster__likes'>
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

function HorizontalReviewType1({
  posterLowResImgSrc,
  posterHighResImgSrc,

  mediaTitle,
  mediaYear,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  rating,

  reviewText,

  commentCount,
  likeCount
}) {
  const [avatarLoaded, setAvatarLoaded] = useState(false)

  useEffect(() => {
    const avatarImage = new Image()
    avatarImage.src = avatarHighResImgSrc
    avatarImage.onload = () => {
      setAvatarLoaded(true)
    }
  })

  const avatarStyle = {
    backgroundImage: `url(${ avatarLoaded ? avatarHighResImgSrc : avatarLowResImgSrc })`
  }

  /* ---------------------------- */

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key = { i } className = 'horizontal-review--type-1__star'>
        <IconStarFilled />
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key = { fullStars } className = 'horizontal-review--type-1__star--half'>
        <IconMath1Divide2 />
      </span>
    )
  }

  return (
    <div className = 'horizontal-review--type-1'>
      <MediaSlot
        size = 'small'
        lowResImgSrc = { posterLowResImgSrc }
        highResImgSrc = { posterHighResImgSrc }
      />

      <article className = 'horizontal-review--type-1__details'>
        <section className = 'horizontal-review--type-1__main-info'>
          <h5>
            { mediaTitle }
          </h5>
          <h6>
            { mediaYear }
          </h6>
        </section>

        <section className = 'horizontal-review--type-1__user-rating-comments'>
          <div className = 'horizontal-review--type-1__avatar-username'>
            <div className = 'horizontal-review--type-1__avatar' style = { avatarStyle }></div>

            <h6 className = 'horizontal-review--type-1__username'>{ username }</h6>
          </div>

          <div className = 'horizontal-review--type-1__rating'>
            { stars }
          </div>

          { commentCount > 0 && (
            <span className = 'horizontal-review--type-1__comments'>
              <IconMessage />
              { commentCount }
            </span>
          ) }
        </section>

        {/* TODO: change this way to render the review's text once the text comes from the api */}
        <p className = 'review--without-poster__text' dangerouslySetInnerHTML = {{ __html: reviewText }}></p>

        <section className = 'horizontal-review--type-1__likes'>
          <IconHeartFilled />
          <span className = 'count'>{ likeCount } likes</span>
        </section>
      </article>
    </div>
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

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  rating,

  reviewText,

  commentCount,
  likeCount,

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

          commentCount = { commentCount }
          likeCount = { likeCount }
        />
      break

      /* ------------------------------------------ */

    case true:
      switch (type) {
        case 'vertical':
          conditionalReview =
            <VerticalReview />
          break
        case 'horizontal-1':
          conditionalReview =
            <HorizontalReviewType1
              lang = { lang }

              posterLowResImgSrc = { posterLowResImgSrc }
              posterHighResImgSrc = { posterHighResImgSrc }

              mediaTitle = { mediaTitle }
              mediaYear = { mediaYear }

              avatarLowResImgSrc = { avatarLowResImgSrc }
              avatarHighResImgSrc = { avatarHighResImgSrc }
              username = { username }

              rating = { rating }

              reviewText = { reviewText }

              commentCount = { commentCount }
              likeCount = { likeCount }
            />
          break
        case 'horizontal-2':
          conditionalReview =
            <HorizontalReviewType
              lang = { lang }

              
            />
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
