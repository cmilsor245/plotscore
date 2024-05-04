import { useState, useEffect } from 'react'

import '/styles/components/common/media--normal-slot.css'

function NormalPoster({ lowResImgSrc, highResImgSrc }) {
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

  return (
    <div className = 'media--normal-slot--poster' style = { posterStyle }></div>
  )
}

export function MediaOnlyPoster({ lowResImgSrc, highResImgSrc }) {
  return (
    <NormalPoster className = 'media--only-poster' lowResImgSrc = { lowResImgSrc } highResImgSrc = { highResImgSrc } />
  )
}
