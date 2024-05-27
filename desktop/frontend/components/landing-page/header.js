import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
  IconChevronsRight,
  IconList,
  IconMenu,
  IconMovie,
  IconNotes,
  IconUserFilled,
  IconUserPlus,
  IconUsersGroup,
  IconZoom
} from '@tabler/icons-react'

import NavTab from '/components/landing-page/header--nav-tab.js'
import SideMenuButton from '/components/landing-page/header--side-menu--button.js'
import translate from '/src/app/translation.js'

import '/styles/components/landing-page/header.css'

const navItems = [
  {
    key: 'SIGN_IN',
    text: 'SIGN_IN',
    icon: IconUserFilled,
    link: '/login',
  },
  {
    key: 'CREATE_ACCOUNT',
    text: 'CREATE_ACCOUNT',
    icon: IconUserPlus,
    link: '/signup',
  },
  {
    key: 'MEDIA',
    text: 'MEDIA',
    icon: IconMovie,
  },
  {
    key: 'LISTS',
    text: 'LISTS',
    icon: IconList,
  },
  {
    key: 'MEMBERS',
    text: 'MEMBERS',
    icon: IconUsersGroup,
  },
  {
    key: 'JOURNAL',
    text: 'JOURNAL',
    icon: IconNotes,
  }
]

export default function Header({
  lang,
  isInLandingPage,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header>
      <section>
        <Link className = 'header--logo' href = '/'>
          <Image
            className = 'header--logo-image'
            src = '/logo/logo.png'
            alt = 'plotscore logo'
            width = { 100 }
            height = { 100 }
          />
          <h1 className = 'header--logo-text'>plotscore</h1>
        </Link>
      </section>

      <nav className = 'nav__links--search-bar'>
        <ul className = 'nav__links'>
          {
            navItems.map(item => (
              <NavTab
              key = { item.key }
              text = { translate(lang, 'LANDING_PAGE', 'NAV', item.text) }
              link = { item.link }
            />
            ))
          }
        </ul>

        <div className = 'nav--search-bar'>
          <label htmlFor = 'nav-query' className = 'hidden'>search:</label>
          <input id = 'nav-query' type = 'search' name = 'q' onFocus = { e => e.target.select() } />
          <button type = 'submit'>
            <IconZoom />
          </button>
        </div>
      </nav>

      {/* ---------------------------------------------- */}

      { isInLandingPage && (
        <>
          <div className = 'header--side-menu--wrapper' onClick = { toggleMenu }>
            <IconMenu />
          </div>

          <nav className = { `nav__links--search-bar--mobile ${ isMenuOpen ? 'open' : '' }` }>
            <div className = 'nav--search-bar--mobile'>
              <label htmlFor = 'nav-query-mobile' className = 'hidden'>search:</label>
              <input
                id = 'nav-query-mobile'
                type = 'search'
                name = 'q'
                onFocus = { e => e.target.select() }
                placeholder = { translate(lang, 'LANDING_PAGE', 'NAV_MOBILE', 'SEARCH_BAR_PLACEHOLDER') }
                autoComplete = 'off'
              />
              <button type = 'submit'>
                <IconZoom />
              </button>
            </div>

            <ul className = 'nav__links--mobile'>
              {
                navItems.map(item => (
                  <NavTab
                    key = { item.key }
                    text = { translate(lang, 'LANDING_PAGE', 'NAV', item.text) }
                    icon = { item.icon }
                    link = { item.link }
                    isMobile
                  />
                ))
              }
            </ul>

            <div className = 'nav__links--search-bar--mobile--additional'>
              <div className = 'nav__links--search-bar--mobile--additional--buttons'>
                <SideMenuButton
                  type = { 'login' }
                  text = { translate(lang, 'LANDING_PAGE', 'NAV_MOBILE', 'LOGIN_BUTTON') }
                  link = { '/login' }
                />
                <SideMenuButton
                  type = { 'signup' }
                  text = { translate(lang, 'LANDING_PAGE', 'NAV_MOBILE', 'CREATE_ACCOUNT_BUTTON') }
                  link = {'/signup'}
                />
              </div>

              <IconChevronsRight className = 'nav__links--search-bar--mobile--additional--close-button' onClick = { toggleMenu } />
            </div>
          </nav>

          { isMenuOpen && <div className = 'nav__links--search-bar--mobile--overlay' onClick = { toggleMenu }></div> }
        </>
      ) }
    </header>
  )
}
