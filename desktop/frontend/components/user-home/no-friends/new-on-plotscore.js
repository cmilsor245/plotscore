import { useEffect, useState } from 'react'

import { IconBolt } from '@tabler/icons-react'

import MediaSlot from '/components/common/media-slot.js'
import SectionHeading from '/components/common/section-heading.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import posterSrc from '/src/app/static-info/common/poster-srcs.js'
import translate from '/src/app/translation.js'

export default function NewOnPlotscore({ lang }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [newOnPlotscore, setNewOnPlotscore] = useState([])

  useEffect(() => {
    const fetchNewOnPlotscore = async () => {
      try {
        const response = await fetch(`${ apiUrl }/new-on-plotscore`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setNewOnPlotscore(data)
        } else {
          console.log('failed to fetch new-on-plotscore:', response.statusText)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchNewOnPlotscore()
  }, [])

  /* ------------------------------------ */

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
    <section className = 'section__heading-and-content new-on-plotscore'>
      <SectionHeading
        lang = { lang }
        namespace = 'USER_HOME'
        section = 'NEW_ON_PLOTSCORE'
        title = 'SECTION_TITLE'
        hasRightSideIconAndText = { [
          <IconBolt stroke = { 1 } />,
          translate(lang, 'USER_HOME', 'GENERAL_ACTIVITY', 'ALL_ACTIVITY')
        ] }
        hasDivider
      />

      <section className = 'section-content new-on-plotscore__logs'>
        { newOnPlotscore.map((log, index) => {
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
      </section>
    </section>
  )
}
