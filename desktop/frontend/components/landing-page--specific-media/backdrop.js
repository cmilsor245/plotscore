import { useState, useEffect } from 'react'
import Link from 'next/link'

import '/styles/components/common/backdrop.css'

const Backdrop = () => {
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = '/img/landing-page--specific-media/high-res-backdrop.webp'
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const backdropStyle = {
    backgroundImage: `url(${ imageLoaded ? '/img/landing-page--specific-media/high-res-backdrop.webp' : '/img/landing-page--specific-media/low-res-backdrop.webp' })`
  }

  return (
    <div className = 'backdrop--wrapper' style = { backdropStyle }>
      <Link className = 'backdrop--media-title' href = '/test'>Star Wars (1977)</Link>
    </div>
  )
}

export default Backdrop
