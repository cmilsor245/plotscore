import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  IconAlignJustified,
  IconMath1Divide2,
  IconRefresh,
  IconStarFilled
} from '@tabler/icons-react'

import '/styles/components/common/media-slot.css'

function Poster({
  size,
  lowResImgSrc,
  highResImgSrc,
  hasLogInfo,
  username,
  mediaLink
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = highResImgSrc
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const posterStyle = {
    backgroundImage: `url(${ imageLoaded ? highResImgSrc : lowResImgSrc })`
  }

  /* ---------------------------------------- */

  let conditionalSizeClassName

  switch (size) {
    case 'small':
      conditionalSizeClassName = 'media-slot--small'
      break
    case 'medium':
      conditionalSizeClassName = 'media-slot--medium'
      break
    case 'normal':
      conditionalSizeClassName = 'media-slot--normal'
      break
    case 'large':
      conditionalSizeClassName = 'media-slot--large'
      break
    default:
      conditionalSizeClassName = 'media-slot--normal'
      break
  }

  conditionalSizeClassName += ` media-slot__poster ${ (hasLogInfo && username) && 'media-slot__poster--sharp-border' }`

  return (
    <Link href = { mediaLink ? mediaLink : '/' }>
      <section className = { conditionalSizeClassName } style = { posterStyle }></section>
    </Link>
  )
}

function LogInfo({
  hasLogInfo,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  rating,
  hasWatchedBefore,
  hasReviewText,
  date,

  userLink
}) {
  if (!hasLogInfo) {
    return null
  }

  /* ---------------------------------------- */

  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = avatarHighResImgSrc
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const avatarStyle = {
    backgroundImage: `url(${ imageLoaded ? avatarHighResImgSrc : avatarLowResImgSrc })`
  }

  /* ---------------------------------------- */

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const stars = []

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <span key = { i } className = 'media-slot__star'>
        <IconStarFilled />
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key = { fullStars } className = 'media-slot__star--half'>
        <IconMath1Divide2 />
      </span>
    )
  }

  return (
    <section className = 'media-slot__log-info'>
      { username &&
        <article className = 'media-slot__user'>
          <div className = 'media-slot__avatar' style = { avatarStyle }></div>
          <Link href = { userLink ? userLink : '/' }>
            <h6 className = 'media-slot__username'>{ username }</h6>
          </Link>
        </article>
      }

      {/* ----------------------- */}

      <article className = { `log__details ${ !username && 'with-margin' }` }>
        <div className = 'log__left-side'>
          <div className = 'media-slot__stars'>
            { stars }
          </div>
          {
            hasWatchedBefore && (
              <span className = 'log__watched-before'>
                <IconRefresh />
              </span>
            )
          }
          {
            hasReviewText && (
            <span className = 'log__review-text'>
              <IconAlignJustified />
            </span>
            )
          }
        </div>

        <div className = 'log__right-side'>
          <span className = 'log__date'>{ date }</span>
        </div>
      </article>
    </section>
  )
}

/* ------------------------------------------------------------------------------------ */

export default function MediaSlot({
  size,
  lowResImgSrc,
  highResImgSrc,

  hasLogInfo,
  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,
  rating,
  hasWatchedBefore,
  hasReviewText,
  date,

  mediaLink,
  userLink
}) {
  return (
    <div className = 'media-slot'>
      <Poster
        size = { size }
        lowResImgSrc = { lowResImgSrc }
        highResImgSrc = { highResImgSrc }
        hasLogInfo = { hasLogInfo }
        username = { username }
        mediaLink = { mediaLink }
      />
      <LogInfo
        hasLogInfo = { hasLogInfo }
        avatarLowResImgSrc = { avatarLowResImgSrc }
        avatarHighResImgSrc = { avatarHighResImgSrc }
        username = { username }
        rating = { rating }
        hasWatchedBefore = { hasWatchedBefore }
        hasReviewText = { hasReviewText }
        date = { date }
        userLink = { userLink }
      />
    </div>
  )
}
