import translate from '/src/app/translation.js'

import '/styles/components/common/section-heading.css'

export default function SectionHeading({
  lang,
  namespace,
  section,

  title,
  tabs,

  hasRightSideSingleText,
  hasRightSideIconAndText,
  filters,
  views,

  hasDivider
}) {
  let conditionalLeftSide

  if (title) {
    conditionalLeftSide = (
      <h3 className = 'section-heading__title'>
        { translate(lang, namespace, section, title) }
      </h3>
    )
  } else if (tabs) {
    conditionalLeftSide = (
      <ul className = 'section-heading__tabs'>
        { tabs.map((tab, index) => (
          <li key = { index }>
            { translate(lang, namespace, section, tab) }
          </li>
        )) }
      </ul>
    )
  }

  /* ------------------------------------- */

  let conditionalRightSide

  if (hasRightSideSingleText) {
    conditionalRightSide = (
      <span className = 'section-heading__single-text'>
        { hasRightSideSingleText }
      </span>
    )
  } else if (hasRightSideIconAndText) {
    conditionalRightSide = (
      <div className = 'section-heading__icon-and-text'>
        <span className = 'section-heading__icon'>
          { hasRightSideIconAndText[0] }
        </span>
        <span className = 'section-heading__text'>
          { translate(lang, namespace, section, hasRightSideIconAndText[1]) }
        </span>
      </div>
    )
  } else if (filters) {
    conditionalRightSide = (
      <ul className = 'section-heading__filters'>
        { filters.map((filter, index) => (
          <li key = { index }>
            <span>
              { translate(lang, namespace, section, filter[0]) }
            </span>
            <span>
              { filter[1] }
            </span>
          </li>
        )) }

        { views && (
          views.map((view, index) => (
            <li key = { index }>
            <span>
              { view[0] }
            </span>
            <span>
              { view[1] }
            </span>
            </li>
          ))
        ) }
      </ul>
    )
  }

  /* ------------------------------------- */

  return (
    <section className = 'section-heading'>
      <div className = 'section-heading__upper'>
        { conditionalLeftSide }
        { conditionalRightSide }
      </div>

      { hasDivider && <div className = 'section-heading__divider'></div> }
    </section>
  )
}
