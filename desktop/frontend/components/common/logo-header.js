import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import '/styles/components/common/logo-header.css'

export default function LogoHeader() {
  const [showLogo, setShowLogo] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowLogo(true)
      } else {
        setShowLogo(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className = { `common-content-footer__logo ${ showLogo ? 'show-logo' : 'show-text' } centered` }>
      <Link className = 'common-content-footer__logo-text' href = '/'>
        <h1>plotscore</h1>
      </Link>
      <Link className = 'common-content-footer__logo-image' href = '/'>
        <Image
          src = '/logo/logo.png'
          alt = 'plotscore logo'
          width = { 130 }
          height = { 130 }
        />
      </Link>
    </div>
  )
}
