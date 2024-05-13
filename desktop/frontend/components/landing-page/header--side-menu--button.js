import Link from 'next/link'

export default function HeaderSideMenuButton({ type, text, onClick }) {
  let conditionalClassName = 'login'

  if (type === 'signup') {
    conditionalClassName = 'signup'
  }

  return (
    <div
      className = { `nav--links--search-bar--mobile--additional--button ${ conditionalClassName }` }
      onClick = { onClick }
    >
      <Link href = '/'>{ text }</Link>
    </div>
  )
}
