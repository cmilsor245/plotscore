import Link from 'next/link'
import { useEffect, useState } from 'react'

import { IconAlignJustified, IconMath1Divide2, IconRefresh, IconStarFilled } from '@tabler/icons-react'

import '/styles/components/common/media-slot.css'

function Poster({ size, lowResImgSrc, highResImgSrc, hasLogInfo }) {
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

  conditionalSizeClassName += ` media-slot--poster ${ hasLogInfo && 'media-slot--poster--sharp-border' }`

  return (
    <section className = { conditionalSizeClassName } style = { posterStyle }>
      <Link href = '/' />
    </section>
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
  date
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
      <span key = { i } className = 'media-slot--log-info--details--star'>
        <IconStarFilled />
      </span>
    )
  }

  if (hasHalfStar) {
    stars.push(
      <span key = { fullStars } className = 'media-slot--log-info--details--star-half'>
        <IconMath1Divide2 />
      </span>
    )
  }

  return (
    <section className = 'media-slot--log-info'>
      <article className = 'media-slot--log-info--user'>
        <div className = 'media-slot--log-info--user--avatar' style = { avatarStyle }></div>
        <h6 className = 'media-slot--log-info--user--username'>{ username }</h6>
      </article>

      {/* ----------------------- */}

      <article className = 'media-slot--log-info--details'>
        <div className = 'media-slot--log-info--details--left-side'>
          <div className = 'media-slot--log-info--details--stars'>
            { stars }
          </div>
          {
            hasWatchedBefore && (
              <span className = 'media-slot--log-info--details--left-side--watched-before'>
                <IconRefresh />
              </span>
            )
          }
          {
            hasReviewText && (
            <span className = 'media-slot--log-info--details--left-side--review-text'>
              <IconAlignJustified />
            </span>
            )
          }
        </div>

        <div className = 'media-slot--log-info--details--right-side'>
          <span className = 'media-slot--log-info--details--right-side--date'>{ date }</span>
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
  date
}) {
  return (
    <div className = 'media-slot'>
      <Poster
        size = { size }
        lowResImgSrc = { lowResImgSrc }
        highResImgSrc = { highResImgSrc }
        hasLogInfo = { hasLogInfo }
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
      />
    </div>
  )
}
