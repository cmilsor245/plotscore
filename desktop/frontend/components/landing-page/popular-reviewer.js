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
      <div className = 'popular-reviewer__avatar' style = { avatarStyle }></div>

      <section className = 'popular-reviewer__info'>
        <h3 className = 'popular-reviewer__username'>
          { username }
        </h3>

        <div className = 'popular-reviewer__counts'>
          { watchedMediaCount } { translate(lang, 'LANDING_PAGE', 'POPULAR_REVIEWERS', 'WATCHED_MEDIA_COUNT') }, { reviewCount } reviews
        </div>
      </section>
    </div>
  )
}
