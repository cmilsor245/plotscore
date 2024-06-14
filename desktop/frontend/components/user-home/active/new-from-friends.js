import { IconBolt } from '@tabler/icons-react'

import SectionHeading from '/components/common/section-heading.js'
import translate from '/src/app/translation.js'

export default function NewFromFriends({ lang, followingList }) {
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

      <section className = 'general-activity__logs'>
        { followingList.map((username, index) => {
          <p key = { index }>{ username }</p>
        }) }
      </section>
    </section>
  )
}
