'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  IconBulbFilled,
  IconBulbOff,
  IconHomeShare
} from '@tabler/icons-react'

import {
  CircleFlagsEs,
  CircleFlagsUk,
  MainActionButton
} from '/components/common/main-action-button.js'

import Footer from '/components/common/footer.js'
import translate from '/src/app/translation.js'

import '/styles/pages/not-found.css'

export default function NotFound() {
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

  /* ------------------------------------------------ */

  const lowResImageSrc = '/img/not-found-page/low-res--background.webp'
  const highResImageSrc = '/img/not-found-page/high-res--background.webp'

  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = highResImageSrc
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const backgroundStyle = {
    backgroundImage: `url(${ imageLoaded ? highResImageSrc : lowResImageSrc })`
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { lang === 'en' ? CircleFlagsEs : CircleFlagsUk }
          handleClick = { handleLanguageChange }
        />
        <MainActionButton
          icon = { theme === 'dark' ? IconBulbFilled : IconBulbOff }
          handleClick = { handleThemeChange }
        />
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}

      <section className = 'not-found-page' style = { backgroundStyle }>
        <section className = 'not-found-page--content'>
          <article className = 'not-found-page--text-area'>
            <Link className = 'not-found-page--go-back--button' href = '/'>
              <IconHomeShare />
            </Link>

            <h1>404</h1>
            <h2>
              { translate(lang, 'NOT_FOUND_PAGE', 'CONTENT_AREA', 'PAGE_NOT_FOUND') }
            </h2>
          </article>
        </section>
        <Footer lang = { lang } />
      </section>
    </>
  )
}
