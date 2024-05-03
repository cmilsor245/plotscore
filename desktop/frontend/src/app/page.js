'use client'

import React, { useState, useEffect } from 'react'
import cookie from 'js-cookie'

import { IconBulbFilled, IconBulbOff } from '@tabler/icons-react'

import { MainActionButton, CircleFlagsUk, CircleFlagsEs } from '/components/common/main-action-button'
import Header from '/components/common/header'
import Backdrop from '/components/common/backdrop'
import Footer from '/components/common/footer'

import '/styles/global.css'
import '/styles/common/landing-page--specific-media.css'

export default function LandingPage() {
  const [lang, setLang] = useState('en')
  const [theme, setTheme] = useState('dark')

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

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    cookie.set('theme', newTheme, { expires: 365 })
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { lang === 'en' ? CircleFlagsEs : CircleFlagsUk }
          handleClick = { handleLanguageChange }
        />
        <MainActionButton
          icon = { theme === 'light' ? IconBulbOff : IconBulbFilled }
          handleClick = { handleThemeChange }
        />
      </div>

      <section>
        <Header lang = { lang } />

        <article className = 'landing-page--specific-media--bottom'>
          <Backdrop />
          <main></main>
          <Footer />
        </article>
      </section>
    </>
  )
}
