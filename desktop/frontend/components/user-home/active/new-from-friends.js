import { IconBolt } from '@tabler/icons-react'

import SectionHeading from '/components/common/section-heading.js'

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
          'ALL_ACTIVITY'
        ] }
        hasDivider
      />

      <section className = 'general-activity__logs'>
        { followingList.map(username => <p>{ username }</p>) }
      </section>
    </section>
  )
}