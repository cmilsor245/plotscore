'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom,
  IconBolt
} from '@tabler/icons-react'

import Footer from '/components/common/footer.js'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button.js'
import SectionHeading from '/components/common/section-heading.js'
import SideMenu from '/components/common/side-menu.js'
import translate from '/src/app/translation.js'

import '/styles/pages/user-home.css'

export default function UserHome({
  userData,
  handleLogout
}) {
  const [theme, setTheme] = useState('dark') // default color theme

  useEffect(() => {
    const storedLang = cookie.get('lang')
    const storedTheme = cookie.get('theme')

    if (storedLang) setLang(storedLang)
    if (storedTheme) setTheme(storedTheme)

    document.body.classList.add(theme + '-theme')

    return () => {
      document.body.classList.remove(theme + '-theme')
    }
  }, [theme])

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    cookie.set('theme', newTheme, { expires: 365 })
  }

  /* ------------------------------- */

  const [lang, setLang] = useState('en') // default language

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { IconZoom }
          handleClick = { null }
        />
        <MainActionButton
          icon = { IconPencilPlus }
          handleClick = { null }
        />
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}

      <SideMenu
        lang = { lang }
        handleLanguageChange = { handleLanguageChange }
        theme = { theme }
        handleThemeChange = { handleThemeChange }
        userData = { userData }
        handleLogout = { handleLogout }
      />

      <section className = 'common__content-footer with-top-padding'>
        <section className = 'common__content'>
          <main>
            <LogoHeader />

            <section className = 'content__logo-header common'>
              <h2 className = 'welcome-text'>
                { translate(lang, 'USER_HOME', 'WELCOME_TEXT', 'TEXT_LEFT') }
                <Link href = '/profile'>
                  { userData?.given_name ? userData.given_name : userData?.username }
                </Link>
                { translate(lang, 'USER_HOME', 'WELCOME_TEXT', 'TEXT_RIGHT') }
              </h2>

              {/* ------------------------------------------------------ */}

              <section className = 'section__heading-and-content general-activity'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'USER_HOME'
                  section = 'GENERAL_ACTIVITY'
                  title = 'SECTION_TITLE'
                  hasRightSideIconAndText = {[
                    <IconBolt stroke = { 1 } />,
                    'ALL_ACTIVITY'
                  ]}
                  hasDivider
                />

                <section className = 'general-activity__logs'>
                  
                </section>
              </section>
            </section>
          </main>
        </section>

        <Footer lang = { lang } />
      </section>
    </>
  )
}
