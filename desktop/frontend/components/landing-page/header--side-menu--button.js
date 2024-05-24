import Link from 'next/link'

export default function HeaderSideMenuButton({ type, text, link }) {
  let conditionalClassName = 'login'

  if (type === 'signup') {
    conditionalClassName = 'signup'
  }

  return (
    <Link
      className = { `nav--links--search-bar--mobile--additional--button ${ conditionalClassName }` }
      href = { link }
    >
      { text }
    </Link>
  )
}
