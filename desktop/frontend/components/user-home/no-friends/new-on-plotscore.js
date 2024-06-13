import { useEffect, useState } from 'react'

import { IconBolt } from '@tabler/icons-react'

import MediaSlot from '/components/common/media-slot.js'
import SectionHeading from '/components/common/section-heading.js'

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

  return (
    <section className = 'section__heading-and-content new-on-plotscore'>
      <SectionHeading
        lang = { lang }
        namespace = 'USER_HOME'
        section = 'NEW_ON_PLOTSCORE'
        title = 'SECTION_TITLE'
        hasRightSideIconAndText = { [
          <IconBolt stroke = { 1 } />,
          'ALL_ACTIVITY'
        ] }
        hasDivider
      />

      <section className = 'new-on-plotscore__logs'>
        { newOnPlotscore.map((log, index) => (
          <MediaSlot
            key = { index }
            size = 'normal'
            lowResImgSrc = { log.media.poster_src }
            highResImgSrc = { log.media.poster_src }
          />
        )) }
      </section>
    </section>
  )
}
