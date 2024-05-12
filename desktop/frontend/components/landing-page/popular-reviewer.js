import { useEffect, useState } from 'react'

import translate from '/src/app/translation.js'

import '/styles/components/landing-page/popular-reviewer.css'

export default function PopularReviewer({
  lang,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  watchedMediaCount,
  reviewCount
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

  return (
    <div className = 'popular-reviewer'>
      <div className = 'popular-reviewer--avatar' style = { avatarStyle }></div>

      <section className = 'popular-reviewer--info'>
        <h3 className = 'popular-reviewer--username'>
          { username }
        </h3>

        <div className = 'popular-reviewer--counts'>
          { watchedMediaCount } { translate(lang, 'LANDING_PAGE', 'POPULAR_REVIEWERS', 'WATCHED_MEDIA_COUNT') }, { reviewCount } reviews
        </div>
      </section>
    </div>
  )
}
