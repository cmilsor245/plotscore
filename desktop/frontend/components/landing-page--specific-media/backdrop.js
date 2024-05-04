import { useState, useEffect } from 'react'
import Link from 'next/link'

import '/styles/components/common/backdrop.css'

export default function Backdrop({ lowResImgSrc, highResImgSrc }) {
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
    <div className = 'backdrop--wrapper' style = { backdropStyle }>
      <Link className = 'backdrop--media-title' href = '/'>Star Wars (1977)</Link>
    </div>
  )
}
