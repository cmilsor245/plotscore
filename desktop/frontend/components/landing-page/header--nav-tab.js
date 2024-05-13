import Link from 'next/link'

export default function NavTab({
  text,
  isMobile,
  icon: Icon,

  interactive,
  onClick
}) {
  let conditionalClass = 'nav--link'

  if (isMobile) {
    conditionalClass = 'nav--link--mobile'
  }

  return (
    <li
      className = { conditionalClass }
      onClick = { interactive ? onClick : null }
    >
      <Link href = '/'>
        { text }
        { isMobile && <Icon className = 'nav--link--mobile--icon' /> }
      </Link>
    </li>
  )
}
