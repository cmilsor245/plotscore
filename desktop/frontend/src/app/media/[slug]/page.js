'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import { MainActionButton } from '/components/common/main-action-button'
import ReviewModal from '/components/common/review-modal.js'
import SideMenu from '/components/common/side-menu.js'
import translate from '/src/app/translation.js'

export default function Media() {
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

  /* ------------------------------- */

  const [isReviewModalDisplayed, setIsReviewModalDisplayed] = useState(false)

  const openReviewModal = () => {
    setIsReviewModalDisplayed(true)
  }

  const closeReviewModal = () => {
    setIsReviewModalDisplayed(false)
  }

  /* ------------------------------- */

  const [isReviewCreationNotificationDisplayed, setIsReviewCreationNotificationDisplayed] = useState(false)
  const [mediaTitleForNotification, setMediaTitleForNotification] = useState('')
  const [mediaSlug, setMediaSlug] = useState('')

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleReviewCreatedNotification = (mediaTitle, releaseDate) => {
    setIsReviewCreationNotificationDisplayed(true)
    setMediaTitleForNotification(mediaTitle)

    const sluggedTitle = convertToSlug(mediaTitle)
    const mediaYear = releaseDate.substring(0, 4)

    console.log(sluggedTitle, mediaYear)

    const mediaSlug = sluggedTitle + '-' + mediaYear

    setMediaSlug(mediaSlug)
    closeReviewModal()
    setTimeout(() => {
      setIsReviewCreationNotificationDisplayed(false)
      setMediaTitleForNotification('')
    }, 3000)
  }

  /* ------------------------------- */

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

  /* ------------------------------- */

  const router = useRouter()

  const logout = async () => {
    await fetch(`${ apiUrl }/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    router.push('/')
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

      { isReviewModalDisplayed && userData && (
        <>
          <ReviewModal
            lang = { lang }
            userData = { userData }
            closeReviewModal = { closeReviewModal }
            handleReviewCreatedNotification = { handleReviewCreatedNotification }
          />
          <div className = 'review-modal__overlay'></div>
        </>
      ) }

      <div className = { `review-modal__creation-notification ${ isReviewCreationNotificationDisplayed ? 'showed' : '' }` }>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_1') }
        <Link href = { `/media/${ mediaSlug }` }>{ mediaTitleForNotification }</Link>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_2') }
      </div>

      { userData && (
        <SideMenu
          lang = { lang }
          handleLanguageChange = { handleLanguageChange }
          theme = { theme }
          handleThemeChange = { handleThemeChange }
          userData = { userData }
          handleLogout = { logout }
        />
      ) }
    </>
  )
}
