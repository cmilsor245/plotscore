import { useEffect, useState } from 'react'

import translate from '/src/app/translation.js'

import '/styles/components/landing-page--home/recent--showdown-news.css'

export default function RecentShowdownNews({
  lang,

  backdropLowResImgSrc,
  backdropHighResImgSrc,

  title,

  text
}) {
  const [backdropLoaded, setBackdropLoaded] = useState(false)

  useEffect(() => {
    const backdropImage = new Image()
    backdropImage.src = backdropHighResImgSrc
    backdropImage.onload = () => {
      setBackdropLoaded(true)
    }
  })

  const backdropStyle = {
    backgroundImage: `url(${ backdropLoaded ? backdropHighResImgSrc : backdropLowResImgSrc })`
  }

  return (
    <article className = 'recent--showdown-news'>
      <div className = 'recent--showdown-news--backdrop' style = { backdropStyle }></div>

      <section className = 'recent--showdown-news--details'>
        <h2>
          { title }
        </h2>

        <h6>
          { text }
        </h6>
      </section>
    </article>
  )
}
