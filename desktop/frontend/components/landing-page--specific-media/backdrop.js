import Link from 'next/link'
import { useEffect, useState } from 'react'

import Header from '/components/landing-page/header.js'

import '/styles/components/landing-page--specific-media/backdrop.css'

export default function Backdrop({
  lowResImgSrc,
  highResImgSrc,

  hasHeader,
  isInLandingPage,
  lang,
}) {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = highResImgSrc
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const backdropStyle = {
    backgroundImage: `url(${ imageLoaded ? highResImgSrc : lowResImgSrc })`
  }

  return (
    <div className = 'backdrop-wrapper' style = { backdropStyle }>
      { hasHeader &&
        <Header
          lang = { lang }
          isInLandingPage = { isInLandingPage }
        />
      }

      <Link className = 'backdrop__media-title' href = '/media/star-wars-1977'>Star Wars (1977)</Link>
    </div>
  )
}
