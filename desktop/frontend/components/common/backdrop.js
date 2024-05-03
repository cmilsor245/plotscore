import Link from 'next/link'

import '/styles/common/backdrop.css'

export default function Backdrop() {
  return (
    <div className = 'backdrop--wrapper'>
      <Link className = 'backdrop--media-title' href = '/test'>Star Wars (1977)</Link>
    </div>
  )
}
