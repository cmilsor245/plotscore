import Link from 'next/link'

export default function HeaderSideMenuButton({ type, text, link }) {
  let conditionalClassName = 'login'

  if (type === 'signup') {
    conditionalClassName = 'signup'
  }

  return (
    <Link
      className = { `nav__links--search-bar--mobile--additional--button ${ conditionalClassName }` }
      href = { link }
    >
      { text }
    </Link>
  )
}
