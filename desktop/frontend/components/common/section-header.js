import '/styles/components/common/section-heading.css'

export default function SectionHeading({ title, hasDivider, hasRightSideSingleText, hasRightSideIconAndText, tabs, filters, allFilters }) {
  let conditionalLeftSide

  if (title) {
    conditionalLeftSide = (
      <h3 className = 'section-heading--title'>{ title }</h3>
    )
  } else if (tabs) {
    conditionalLeftSide = (
      <ul className = 'section-heading--tabs'>
        { tabs.map((tab, index) => (
          <li key = { index }>{ tab.label }</li>
        )) }
      </ul>
    )
  }

  let conditionalRightSide

  if (hasRightSideSingleText) {
    conditionalRightSide = (
      <span className = 'section-heading--right-side--single-text'>more</span>
    )
  } else if (hasRightSideIconAndText) {
    conditionalRightSide = (
      <div className = 'section-heading--right-side--icon-and-text'>
        <span>▼</span>
        <span>all activity</span>
      </div>
    )
  } else if (filters) {
    conditionalRightSide = (
      <ul className = 'section-heading--right-side--filters'>
        { allFilters.map((filter, index) => (
          <li key = { index }>
            <span>{ filter.label }</span>
            <span>▼</span>
          </li>
        )) }
      </ul>
    )
  }

  return (
    <section className = 'section-heading'>
      { conditionalLeftSide }

      { conditionalRightSide }

      { hasDivider && (
        <div className = 'section-heading--divider'></div>
      ) }
    </section>
  )
}
