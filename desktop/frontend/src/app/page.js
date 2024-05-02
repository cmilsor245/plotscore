'use client'

import React, { useState, useEffect } from 'react'
import { IconBulbFilled, IconBulbOff } from '@tabler/icons-react'

import '/styles/global.css'

import Header from '/components/common/header'
import { MainActionButton, CircleFlagsUk, CircleFlagsEs } from '/components/common/main-action-button'
import Footer from '/components/common/footer'

export default function LandingPage() {
  // language handling
  const [lang, setLang] = useState('en')

  const handleLanguageChange = () => {
    setLang(lang === 'en' ? 'es' : 'en')
  }

  /* -------------------------------------------------------------- */

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

  /* -------------------------------------------------------------- */

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { lang === 'en' ? CircleFlagsEs : CircleFlagsUk }
          handleClick = { handleLanguageChange }
        />
        <MainActionButton
          icon = { theme === 'dark' ? IconBulbFilled : IconBulbOff}
          handleClick = { handleThemeChange }
        />
      </div>

      <Header lang = { lang } handleLanguageChange = { handleLanguageChange } />
      <main>
        
      </main>
      <Footer />
    </>
  )
}
