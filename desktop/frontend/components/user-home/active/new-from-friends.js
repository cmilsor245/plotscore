import { IconBolt } from '@tabler/icons-react'

import MediaSlot from '/components/common/media-slot.js'
import SectionHeading from '/components/common/section-heading.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import posterSrc from '/src/app/static-info/common/poster-srcs.js'
import translate from '/src/app/translation.js'

export default function NewFromFriends({ lang, followingListReviews }) {
  const convertToSlug = (text) => {
    if (typeof text !== 'string') return ''
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const generateMediaSlug = (mediaTitle, mediaYear) => {
    if (!mediaTitle || !mediaYear) return ''
    const sluggedTitle = convertToSlug(mediaTitle)
    const mediaYearConverted = mediaYear.substring(0, 4)

    return `${sluggedTitle}-${mediaYearConverted}`
  }

  return (
    <section className = 'section__heading-and-content general-activity'>
      <SectionHeading
        lang = { lang }
        namespace = 'USER_HOME'
        section = 'GENERAL_ACTIVITY'
        title = 'SECTION_TITLE'
        hasRightSideIconAndText = { [
          <IconBolt stroke = { 1 } />,
          translate(lang, 'USER_HOME', 'GENERAL_ACTIVITY', 'ALL_ACTIVITY')
        ] }
        hasDivider
      />

      <section className = 'section-content general-activity__logs'>
        { followingListReviews.map((log, index) => {
          const mediaLink = `/media/${ generateMediaSlug(log.media_title, log.media_release_date) }`
          const userLink = `/user/${ log.user_username }`

          return (
            <MediaSlot
              key = { index }
              size = 'normal'
              lowResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }
              highResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }

              hasLogInfo
              avatarLowResImgSrc = { avatarSrc[Math.floor(Math.random() * avatarSrc.length)] }
              avatarHighResImgSrc = { avatarSrc[Math.floor(Math.random() * avatarSrc.length)] }
              username = { log.user_username }

              rating = { log.rating }
              hasWatchedBefore = { log.watched_before ? true : false }
              hasReviewText = { log.review_text ? true : false }
              date = { log.created_at.slice(5, 10) }

              mediaLink = { mediaLink }
              userLink = { userLink }
            />
          )
        }) }
        { followingListReviews.length < 6 && [...Array(6 - followingListReviews.length)].map((_, index) => (
          <div className = 'media-slot__placeholder empty-activity' key = { index }></div>
        )) }
      </section>
    </section>
  )
}
