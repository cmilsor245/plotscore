import Link from 'next/link'

export default function NavTab({
  text,
  isMobile,
  icon: Icon,
  link
}) {
  let conditionalClass = 'nav__link'

  if (isMobile) {
    conditionalClass = 'nav__link--mobile'
  }

  /* ----------- */

  const linkHref = link ? link : '/'

  return (
    <li className = { conditionalClass }>
      <Link href = { linkHref }>
        { text }
        { isMobile && <Icon className = 'nav--mobile__icon' /> }
      </Link>
    </li>
  )
}
