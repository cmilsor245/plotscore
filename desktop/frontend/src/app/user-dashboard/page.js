'use client'

import cookie from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import Footer from '/components/common/footer.js'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button.js'
import SideMenu from '/components/common/side-menu.js'

import '/styles/pages/user-home.css'

export default function UserDashboard({
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

            <section className = 'content__logo-header'>
              <p>test user</p>
            </section>
          </main>
        </section>

        <Footer lang = { lang } />
      </section>
    </>
  )
}
