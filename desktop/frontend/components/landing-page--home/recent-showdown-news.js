import { useEffect, useState } from 'react'

import '/styles/components/landing-page--home/recent-showdown-news.css'

export default function RecentShowdownNews({
  className,

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
    <article
      className = {
        `recent-showdown-news
        ${ className }
        ${ lang === 'en' ? 'english' : 'spanish' }`
      }
    >
      <div className = 'recent-showdown-news__backdrop' style = { backdropStyle }></div>

      <section className = 'recent-showdown-news__details'>
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
