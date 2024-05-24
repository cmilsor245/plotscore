import Image from 'next/image'
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
    <div className = { `common--content-footer--logo ${ showLogo ? 'show-logo' : 'show-text' } centered` }>
      <h1 className = 'common--content-footer--logo-text'>plotscore</h1>
      <Image
        className = 'header--logo-image'
        src = '/logo/logo.png'
        alt = 'plotscore logo'
        width = { 130 }
        height = { 130 }
      />
    </div>
  )
}
