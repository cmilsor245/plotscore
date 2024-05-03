import Link from 'next/link'

export default function NavTab({ text }) {
  return (
    <li className = 'nav--link'>
      <Link href = '/'>{ text }</Link>
    </li>
  )
}
