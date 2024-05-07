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
      <h3 className = 'section-heading--title'>
        { translate(lang, namespace, section, title) }
      </h3>
    )
  } else if (tabs) {
    conditionalLeftSide = (
      <ul className = 'section-heading--tabs'>
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
      <span className = 'section-heading--right-side--single-text'>
        { translate(lang, namespace, section, hasRightSideSingleText) }
      </span>
    )
  } else if (hasRightSideIconAndText) {
    conditionalRightSide = (
      <div className = 'section-heading--right-side--icon-and-text'>
        <span className = 'section-heading--right-side--icon-and-text--icon'>
          { hasRightSideIconAndText[0] }
        </span>
        <span className = 'section-heading--right-side--icon-and-text--text'>
          { translate(lang, namespace, section, hasRightSideIconAndText[1]) }
        </span>
      </div>
    )
  } else if (filters) {
    conditionalRightSide = (
      <ul className = 'section-heading--right-side--filters'>
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
      <div className = 'section-heading--upper'>
        { conditionalLeftSide }
        { conditionalRightSide }
      </div>

      { hasDivider && <div className = 'section-heading--divider'></div> }
    </section>
  )
}
