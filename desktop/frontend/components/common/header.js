import Link from 'next/link'
import Image from 'next/image'

import { IconZoom } from '@tabler/icons-react'

import translate from '/src/app/translation'
import translationsEN from '/src/app/translations/en'
import translationsES from '/src/app/translations/es'

import NavTab from '/components/common/header--nav-tab'

import '/styles/global.css'
import '/styles/common/header.css'

export default function Header({ lang }) {
  const translations = lang === 'en' ? translationsEN : translationsES

  return (
    <header>
      <section>
        <Link className = 'header--logo' href = '/'>
          <Image className = 'header--logo-image' src = '/logo/logo.png' alt = 'plotscore logo' width = { 100 } height = { 100 } />
          <span className = 'header--logo-text'>plotscore</span>
        </Link>
      </section>

      <nav className = 'nav--links--search-bar'>
        <ul className = 'nav--links'>
          { Object.keys(translations.LANDING_PAGE.NAV).map(( key ) => (
            <NavTab key = { key } text = { translate(lang, 'LANDING_PAGE', 'NAV', key) } />
          )) }
        </ul>

        <div className = 'nav--search-bar'>
          <input type = 'search' name = 'q' onFocus = { e => e.target.select() } />
          <button type = 'submit'>
            <IconZoom />
          </button>
        </div>
      </nav>
    </header>
  )
}
