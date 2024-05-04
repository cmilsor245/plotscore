import Link from 'next/link'
import Image from 'next/image'

import { IconZoom } from '@tabler/icons-react'

import translate from '/src/app/translation.js'
import translationsEN from '/src/app/translations/en.js'
import translationsES from '/src/app/translations/es.js'

import NavTab from '/components/landing-page--specific-media/header--nav-tab.js'

import '/styles/global.css'
import '/styles/components/common/header.css'

export default function Header({ lang }) {
  const translations = lang === 'en' ? translationsEN : translationsES

  return (
    <header>
      <section>
        <Link className = 'header--logo' href = '/'>
          <Image className = 'header--logo-image' src = '/logo/logo.png' alt = 'plotscore logo' width = { 100 } height = { 100 } />
          <h1 className = 'header--logo-text'>plotscore</h1>
        </Link>
      </section>

      <nav className = 'nav--links--search-bar'>
        <ul className = 'nav--links'>
          { Object.keys(translations.LANDING_PAGE.NAV).map(( key ) => (
            <NavTab text = { translate(lang, 'LANDING_PAGE', 'NAV', key) } />
          )) }
        </ul>

        <div className = 'nav--search-bar'>
          <label htmlFor = 'nav-query' className = 'hidden'>search:</label>
          <input id = 'nav-query' type = 'search' name = 'q' onFocus = { e => e.target.select() } />
          <button type = 'submit'>
            <IconZoom />
          </button>
        </div>
      </nav>
    </header>
  )
}
