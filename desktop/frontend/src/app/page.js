'use client'

import React, { useState, useEffect } from 'react'
import cookie from 'js-cookie'

import { IconBulbFilled, IconBulbOff } from '@tabler/icons-react'

import translate from './translation.js'
import { MainActionButton, CircleFlagsUk, CircleFlagsEs } from '/components/common/main-action-button.js'
import Header from '/components/landing-page--specific-media/header.js'
import Backdrop from '/components/landing-page--specific-media/backdrop.js'
import { MdiAppleDarkTheme, MdiAppleLightTheme, MaterialSymbolsAndroidDarkTheme, MaterialSymbolsAndroidLightTheme } from '/components/landing-page--specific-media/also-available.js'
import { MediaOnlyPoster } from '/components/common/media--normal-slot.js'
import Footer from '/components/common/footer.js'

import '/styles/global.css'
import '/styles/pages/landing-page--specific-media.css'

export default function LandingPage() {
  const [lang, setLang] = useState('en') // default language
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

  /* -------------------------------------------------------------------- */

  const featuredMediaPosters = [
    
  ]

  /* -------------------------------------------------------------------- */

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

      <section>
        <Header lang = { lang } />

        <article className = 'landing-page--specific-media--content'>
          <Backdrop lowResImgSrc = '/img/landing-page--specific-media/low-res-backdrop.webp' highResImgSrc = '/img/landing-page--specific-media/high-res-backdrop.webp' />

          {/* ----------------------------------------------------------------------- */}

          <main>
            <section className = 'usp'>
              <h2 className = 'usp--main-text'>
                { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__FIRST_LINE') }
                <br />
                { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__SECOND_LINE') }
                <br />
                { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__THIRD_LINE') }
              </h2>

              <button className = 'usp--get-started-button'>
                { translate(lang, 'LANDING_PAGE', 'USP', 'GET_STARTED_BUTTON') }
              </button>

              <div className = 'usp--also-available'>
                <p>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'ALSO_AVAILABLE') }
                </p>

                <span className = 'usp--also-available--icon'>
                  { theme === 'dark' ? <MdiAppleDarkTheme /> : <MdiAppleLightTheme /> }
                </span>
                <span className = 'usp--also-available--icon'>
                  { theme === 'dark' ? <MaterialSymbolsAndroidDarkTheme /> : <MaterialSymbolsAndroidLightTheme /> }
                </span>
              </div>
            </section>

            {/* ---------------------------------------------------- */}

            <section className = 'featured-media'>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/1--low-res-poster.webp' highResImgSrc = '/img/landing-page/1--high-res-poster.webp' />
              </div>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/2--low-res-poster.webp' highResImgSrc = '/img/landing-page/2--high-res-poster.webp' />
              </div>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/3--low-res-poster.webp' highResImgSrc = '/img/landing-page/3--high-res-poster.webp' />
              </div>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/4--low-res-poster.webp' highResImgSrc = '/img/landing-page/4--high-res-poster.webp' />
              </div>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/5--low-res-poster.webp' highResImgSrc = '/img/landing-page/5--high-res-poster.webp' />
              </div>
              <div className = 'featured-media--slot'>
                <MediaOnlyPoster lowResImgSrc = '/img/landing-page/6--low-res-poster.webp' highResImgSrc = '/img/landing-page/6--high-res-poster.webp' />
              </div>
            </section>
          </main>

          {/* ----------------------------------------------------------------------- */}

          <Footer />
        </article>
      </section>
    </>
  )
}
