'use client'

import cookie from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import { MainActionButton } from '/components/common/main-action-button.js'
import SideMenu from '/components/common/side-menu.js'

export default function Home() {
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

  /* --------------------------------------- */

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${ apiUrl }/user`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    }

    fetchUserData()
  }, [apiUrl])

  /* --------------------------------------- */

  const logout = async () => {
    await fetch(`${ apiUrl }/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    window.location.reload()
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

        userData = { userData }
      />
    </>
  )
}
