import Image from 'next/image'
import Link from 'next/link'

import { IconZoom } from '@tabler/icons-react'

import NavTab from '/components/landing-page/header--nav-tab.js'
import translate from '/src/app/translation.js'

import '/styles/components/landing-page/header.css'
import '/styles/global.css'

export default function Header({ lang }) {
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
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'SIGN_IN') }
          />
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'CREATE_ACCOUNT') }
          />
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'MEDIA') }
          />
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'LISTS') }
          />
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'MEMBERS') }
          />
          <NavTab
            text = { translate(lang, 'LANDING_PAGE', 'NAV', 'JOURNAL') }
          />
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
