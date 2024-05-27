import { useEffect, useState } from 'react'

import translate from '/src/app/translation.js'

import '/styles/components/landing-page--home/recent-story.css'

export default function RecentStory({
  lang,

  backdropLowResImgSrc,
  backdropHighResImgSrc,

  sourceLowResAvatarImgSrc,
  sourceHighResAvatarImgSrc,
  source,

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

  /* ----------------------- */

  const [avatarLoaded, setAvatarLoaded] = useState(false)

  useEffect(() => {
    const avatarImage = new Image()
    avatarImage.src = sourceHighResAvatarImgSrc
    avatarImage.onload = () => {
      setAvatarLoaded(true)
    }
  })

  const avatarStyle = {
    backgroundImage: `url(${ avatarLoaded ? sourceHighResAvatarImgSrc : sourceLowResAvatarImgSrc })`
  }

  return (
    <article className = 'recent-story'>
      <div className = 'recent-story__backdrop' style = { backdropStyle }></div>

      <section className = 'recent-story__details'>
        <section>
          <section className = 'source'>
            <div className = 'source__avatar' style = { avatarStyle }></div>

            <div className = 'source__name'>
              <h2>
                { source }
              </h2>
            </div>
          </section>

          <section className = 'title'>
            <h3>
              { title }
            </h3>
          </section>

          <section className = 'text'>
            {/* TODO: change this way to render the story's text once the text comes from the api */}
            <p dangerouslySetInnerHTML = {{ __html: text }}></p>
          </section>
        </section>

        <span>
          { translate(lang, 'LANDING_PAGE__HOME', 'RECENT_STORIES', 'READ_MORE') }
        </span>
      </section>
    </article>
  )
}
