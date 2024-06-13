import { useEffect, useState } from 'react'

import {
  IconHeart,
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

function HorizontalReviewType2({
  lang,

  posterLowResImgSrc,
  posterHighResImgSrc,

  mediaTitle,
  mediaYear,

  rating,

  reviewText,

  likeCount,

  watchedOn,
  hasWatchedBefore,

  isInOwnProfile,
  isAlreadyLiked,

  handleRemoveLike,
  handleAddLike
}) {
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

  /* ----------------------------- */

  const [watchedOnConverted, setWatchedOnConverted] = useState('')

  useEffect(() => {
    const year = watchedOn.slice(0, 4)
    const month = watchedOn.slice(5, 7)
    const day = watchedOn.slice(8, 10)

    let monthText

    switch (month) {
      case '01':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'JAN')
        break
      case '02':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'FEB')
        break
      case '03':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'MAR')
        break
      case '04':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'APR')
        break
      case '05':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'MAY')
        break
      case '06':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'JUN')
        break
      case '07':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'JUL')
        break
      case '08':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'AUG')
        break
      case '09':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'SEP')
        break
      case '10':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'OCT')
        break
      case '11':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'NOV')
        break
      case '12':
        monthText = translate(lang, 'COMMON', 'REVIEW', 'DEC')
        break
    }

    const formattedDate = `${ day } ${ monthText } ${ year }`

    setWatchedOnConverted(formattedDate)
  })

  return (
    <div className = 'horizontal-review--type-2'>
      <MediaSlot
        size = 'small'
        lowResImgSrc = { posterLowResImgSrc }
        highResImgSrc = { posterHighResImgSrc }
      />

      <article className = 'horizontal-review--type-2__details'>
        <section className = 'horizontal-review--type-2__main-info'>
          <h5>
            { mediaTitle }
          </h5>
          <h6>
            { mediaYear.slice(0, 4) }
          </h6>
        </section>

        <section className = 'horizontal-review--type-2__rating-and-watched-before'>
          { rating > 0 && (
            <div className = 'horizontal-review--type-2__rating'>
              { stars }
            </div>
          ) }

          <div className = 'horizontal-review--type-2__watched-before'>
            { hasWatchedBefore
              ? `${ translate(lang, 'COMMON', 'REVIEW', 'WATCHED_BEFORE') } ${ watchedOnConverted }`
              : `${ translate(lang, 'COMMON', 'REVIEW', 'WATCHED_FIRST_TIME') } ${ watchedOnConverted }`
            }
          </div>
        </section>

        <section className = 'horizontal-review--type-2__review'>
          <p className = 'horizontal-review--type-2__text' dangerouslySetInnerHTML = {{ __html: reviewText }}></p>
        </section>

        <section className = 'horizontal-review--type-2__like'>
          <div className = 'horizontal-review--type-2__like-count'>
            { !isInOwnProfile && (
              !isAlreadyLiked
              ? (
                <span onClick = { handleRemoveLike }>
                  <IconHeartFilled stroke = { 2 } /> { translate(lang, 'COMMON', 'REVIEW', 'LIKED') }
                </span>
              ) : (
                <span onClick = { handleAddLike }>
                  <IconHeart stroke = { 2 } /> { translate(lang, 'COMMON', 'REVIEW', 'LIKE') }
                </span>
              )
            ) }

            {/* -------- */}

            { likeCount > 0
              ? `${ likeCount } likes`
              : `${ translate(lang, 'COMMON', 'REVIEW', 'NO_LIKES') }`
            }
          </div>
        </section>
      </article>
    </div>
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

  watchedOn,
  hasWatchedBefore,

  isInOwnProfile,
  isAlreadyLiked,

  handleRemoveLike,
  handleAddLike,

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
            <HorizontalReviewType2
              lang = { lang }

              posterLowResImgSrc = { posterLowResImgSrc }
              posterHighResImgSrc = { posterHighResImgSrc }

              mediaTitle = { mediaTitle }
              mediaYear = { mediaYear }

              rating = { rating }

              reviewText = { reviewText }

              likeCount = { likeCount }

              watchedOn = { watchedOn }
              hasWatchedBefore = { hasWatchedBefore }

              isInOwnProfile = { isInOwnProfile }
              isAlreadyLiked = { isAlreadyLiked }

              handleRemoveLike = { handleRemoveLike }
              handleAddLike = { handleAddLike }
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
