import Link from 'next/link'

export default function HeaderSideMenuButton({ type, text, link }) {
  let conditionalClassName = 'login'

  if (type === 'signup') {
    conditionalClassName = 'signup'
  }

  return (
    <div
      className = { `nav--links--search-bar--mobile--additional--button ${ conditionalClassName }` }
    >
      <Link href = { link }>{ text }</Link>
    </div>
  )
}
