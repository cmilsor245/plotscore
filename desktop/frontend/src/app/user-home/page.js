'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import Footer from '/components/common/footer.js'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button.js'
import SideMenu from '/components/common/side-menu.js'
import NewFromFriends from '/components/user-home/active/new-from-friends.js'
import NewOnPlotscore from '/components/user-home/no-friends/new-on-plotscore.js'
import ReviewModal from '/components/common/review-modal.js'
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

  /* ------------------------------------------------ */

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [followingList, setFollowingList] = useState([])

  useEffect(() => {
    const getFollowingList = async () => {
      try {
        if (userData && userData.id) {
          const response = await fetch(`${ apiUrl }/get-following/${ userData.id }`, {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response.ok) {
            const data = await response.json()
            setFollowingList(data.following && Array.isArray(data.following) ? data.following.map(follower => follower.username) : [])
          } else {
            throw new Error('failed to fetch following list')
          }
        }
      } catch (error) {
        console.error(error)
      }
    }

    getFollowingList()
  }, [userData?.id])

  /* -------------------------------------------------------- */

  const [isReviewModalDisplayed, setIsReviewModalDisplayed] = useState(false)

  const openReviewModal = () => {
    setIsReviewModalDisplayed(true)
  }

  const closeReviewModal = () => {
    setIsReviewModalDisplayed(false)
  }

  /* ---------------------------------------------------------- */

  const [isReviewCreationNotificationDisplayed, setIsReviewCreationNotificationDisplayed] = useState(false)
  const [mediaTitleForNotification, setMediaTitleForNotification] = useState('')
  const [sluggedMediaTitle, setSluggedMediaTitle] = useState('')

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleReviewCreatedNotification = (mediaTitle) => {
    setIsReviewCreationNotificationDisplayed(true)
    setMediaTitleForNotification(mediaTitle)
    setSluggedMediaTitle(convertToSlug(mediaTitle))
    closeReviewModal()
    setTimeout(() => {
      setIsReviewCreationNotificationDisplayed(false)
      setMediaTitleForNotification('')
    }, 3000)
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
          handleClick = { openReviewModal }
        />
      </div>

      {/* ---------------------------------------------------------------------------------------------- */}

      {
        isReviewModalDisplayed &&
          <>
            <ReviewModal
              lang = { lang }

              userData = { userData }

              closeReviewModal = { closeReviewModal }
              handleReviewCreatedNotification = { handleReviewCreatedNotification }
            />

            <div className = 'review-modal__overlay'></div>
          </>
      }

      <div className = { `review-modal__creation-notification ${ isReviewCreationNotificationDisplayed ? 'showed' : '' }` }>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_1') }
        <Link href = { `/media/${ sluggedMediaTitle }` }>{ mediaTitleForNotification }</Link>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_2') }
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
                <Link href = { `/${ userData?.username }` }>
                  { userData?.given_name ? userData.given_name : userData?.username }
                </Link>
                { translate(lang, 'USER_HOME', 'WELCOME_TEXT', 'TEXT_RIGHT') }
              </h2>

              {/* ------------------------------------------------------ */}

              {
                followingList && followingList.length === 0
                  ? <NewOnPlotscore lang = { lang } />
                  : <NewFromFriends lang = { lang } followingList = { followingList } />
              }
            </section>
          </main>
        </section>

        <Footer lang = { lang} />
      </section>
    </>
  )
}
