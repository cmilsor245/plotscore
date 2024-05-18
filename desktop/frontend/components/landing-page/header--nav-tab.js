import Link from 'next/link'

export default function NavTab({
  text,
  isMobile,
  icon: Icon,
  link
}) {
  let conditionalClass = 'nav--link'

  if (isMobile) {
    conditionalClass = 'nav--link--mobile'
  }

  /* ----------- */

  const linkHref = link ? link : '/'

  return (
    <li className = { conditionalClass }>
      <Link href = { linkHref }>
        { text }
        { isMobile && <Icon className = 'nav--link--mobile--icon' /> }
      </Link>
    </li>
  )
}
