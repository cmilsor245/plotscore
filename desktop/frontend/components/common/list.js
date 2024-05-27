import { useEffect, useState } from 'react'

import { IconHeartFilled, IconMessage } from '@tabler/icons-react'

import MediaSlot from '/components/common/media-slot.js'

import '/styles/components/common/list.css'

function formatNumber(num) {
  if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1)
    return formattedNum.endsWith('.0') ? Math.floor(formattedNum) + 'K' : formattedNum + 'K'
  }
  return num
}

function LandingPageList({
  title,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  posters,

  likeCount,
  commentCount
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
    <article className = 'landing-page__list'>
      <section className = 'landing-page__list-posters'>
        { posters.map((poster, index) => (
          index % 2 === 0 && (
            <MediaSlot
              key = { index }

              size = 'small'
              lowResImgSrc = { poster }
              highResImgSrc = { posters[index + 1] }
            />
          )
        )) }
      </section>

      <section className = 'landing-page__list-info'>
        <h3 className = 'landing-page__list-title'>
          { title }
        </h3>

        <section className = 'landing-page__list-username-and-ratings'>
          <div className = 'landing-page__list-username'>
            <div className = 'landing-page__list-username-avatar' style = { avatarStyle }></div>

            <h4>
              {username}
            </h4>
          </div>

          {/* ----------- */}

          <div className = 'landing-page__list-ratings'>
            <span>
              <IconHeartFilled />
              { formatNumber(likeCount) }
            </span>
            <span>
              <IconMessage />
              { formatNumber(commentCount) }
            </span>
          </div>
        </section>
      </section>
    </article>
  )
}

function ProfilePageList() {
  return (
    <>
      
    </>
  )
}

export default function List({
  lang,

  isInLandingPage,

  title,

  avatarLowResImgSrc,
  avatarHighResImgSrc,
  username,

  posters,

  likeCount,
  commentCount
}) {
  let conditionalList

  switch (isInLandingPage) {
    case true:
      conditionalList =
        <LandingPageList
          title = { title }

          avatarLowResImgSrc = { avatarLowResImgSrc }
          avatarHighResImgSrc = { avatarHighResImgSrc }
          username = { username }

          posters = { posters }

          likeCount = { likeCount }
          commentCount = { commentCount }
        />
      break
    case false:
      conditionalList =
        <ProfilePageList />
      break
  }

  return (
    <>
      { conditionalList }
    </>
  )
}
