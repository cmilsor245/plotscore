import Link from 'next/link'

export default function HeaderSideMenuButton({ type, text }) {
  let conditionalClassName = 'login'

  if (type === 'signup') {
    conditionalClassName = 'signup'
  }

  return (
    <div className = { `nav--links--search-bar--mobile--additional--button ${ conditionalClassName }` }>
      <Link href = '/'>{ text }</Link>
    </div>
  )
}
