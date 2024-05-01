'use client'

import React, { useState, useEffect } from 'react'
import translate from './translation'
import { IconLanguage, IconBulbOff } from '@tabler/icons-react'

import '/styles/global.css'

import MainActionButton from '/components/common/main-action-button'
import '/styles/common/main-action-buttons.css'

import Footer from '/components/common/footer'

export default function LandingPage() {
  // language handling
  const [lang, setLang] = useState('en')
  const handleLanguageChange = () => {
    setLang(lang === 'en' ? 'es' : 'en')
  }

  /* ---------------------------------------------------------------------- */

  // color theme handling
  let storedTheme = 'dark'
  if (typeof window !== 'undefined') {
    storedTheme = localStorage.getItem('theme') || 'dark'
  }

  const [theme, setTheme] = useState(storedTheme)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.add(theme + '-theme')
      localStorage.setItem('theme', theme)
    }
    return () => {
      if (typeof window !== 'undefined') {
        document.body.classList.remove(theme + '-theme')
      }
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
      <div className='main-action-buttons'>
        <MainActionButton
          icon={IconLanguage}
          handleClick={handleLanguageChange}
        />
        <MainActionButton
          icon={IconBulbOff}
          handleClick={handleThemeChange}
        />
      </div>

      {/* -------------------------------------------------------------------- */}

      <main>

      </main>
      <Footer />
    </>
  )
}
