'use client'

import React, { useState, useEffect } from 'react'
import translate from './translation'
import { IconBulbFilled, IconBulbOff } from '@tabler/icons-react'

import '/styles/global.css'

import { MainActionButton, CircleFlagsUk, CircleFlagsEs } from '/components/common/main-action-button'
import Footer from '/components/common/footer'
import Header from '/components/common/header'

export default function LandingPage() {
  // language handling
  const [lang, setLang] = useState('en')

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
  }

  /* ---------------------------------------------------------------------- */

  // color theme handling
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.classList.add(theme + '-theme')

    return () => {
      document.body.classList.remove(theme + '-theme')
    }
  }, [theme])

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  /* ---------------------------------------------------------------------- */

  return (
    <>
      {/* fixed elements */}
      <div className='main-actions-buttons'>
        <MainActionButton
          icon={lang === 'en' ? CircleFlagsEs : CircleFlagsUk}
          handleClick={handleLanguageChange}
        />
        <MainActionButton
          icon={theme === 'light' ? IconBulbOff : IconBulbFilled}
          handleClick={handleThemeChange}
        />
      </div>

      {/* -------------------------------------------------------------------- */}

      <Header lang={lang} handleLanguageChange={handleLanguageChange} />
      <main>

      </main>
      <Footer />
    </>
  )
}
