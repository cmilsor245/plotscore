'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import Divider from '/components/common/divider.js'
import Footer from '/components/common/footer.js'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button.js'
import ReviewModal from '/components/common/review-modal.js'
import Review from '/components/common/review.js'
import SearchForm from '/components/common/search-form.js'
import SectionHeading from '/components/common/section-heading.js'
import SideMenu from '/components/common/side-menu.js'
import RecentShowdownNews from '/components/landing-page--home/recent-showdown-news.js'
import RecentStory from '/components/landing-page--home/recent-story.js'
import NewFromFriends from '/components/user-home/active/new-from-friends.js'
import NewOnPlotscore from '/components/user-home/no-friends/new-on-plotscore.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import posterSrc from '/src/app/static-info/common/poster-srcs.js'
import recentNewsSlotsData from '/src/app/static-info/landing-page/recentNewsSlotsData.js'
import recentShowdownsSlotsData from '/src/app/static-info/landing-page/recentShowdownsSlotsData.js'
import recentStoriesSlotsData from '/src/app/static-info/landing-page/recentStoriesSlotsData.js'
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
  const [followingListReviews, setFollowingListReviews] = useState([])

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

          const data = await response.json()
          setFollowingList(data.following)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getFollowingList()
  }, [userData?.id])

  useEffect(() => {
    if (followingList.length > 0) {
      const getFollowingListReviews = async () => {
        try {
          let reviewsArray = []

          for (const user of followingList) {
            const response = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ user.id }`, {
              method: 'GET',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              }
            })

            if (response.ok) {
              const data = await response.json()
              reviewsArray = [...reviewsArray, ...data.reviews]
            } else {
              throw new Error(`failed to fetch reviews for user ${ user.id }`)
            }
          }

          setFollowingListReviews(reviewsArray)
        } catch (error) {
          console.error(error)
        }
      }

      getFollowingListReviews()
    }
  }, [followingList, apiUrl])

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
    if (typeof text !== 'string') return ''
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const generateMediaSlug = (mediaTitle, mediaYear) => {
    if (!mediaTitle || !mediaYear) return ''
    const sluggedTitle = convertToSlug(mediaTitle)
    const mediaYearConverted = mediaYear.substring(0, 4)

    return `${sluggedTitle}-${mediaYearConverted}`
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

  /* ---------------------------------------------------------- */

  const [sixLatestReviews, setSixLatestReviews] = useState([])

  useEffect(() => {
    const getSixLatestReviews = async () => {
      try {
        const response = await fetch(`${ apiUrl }/all-reviews`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()

          const sortedReviews = data.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

          setSixLatestReviews(sortedReviews.slice(0, 6))
        } else {
          throw new Error('failed to fetch six latest reviews')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getSixLatestReviews()
  }, [apiUrl])

  /* ---------------------------------------------------------- */

  const [isSearchFormDisplayed, setIsSearchFormDisplayed] = useState(false)

  const openSearchForm = () => {
    setIsSearchFormDisplayed(true)
  }

  const closeSearchForm = () => {
    setIsSearchFormDisplayed(false)
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { IconZoom }
          handleClick = { openSearchForm }
        />
        <MainActionButton
          icon = { IconPencilPlus }
          handleClick = { openReviewModal }
        />
      </div>

      {/* ---------------------------------------------------------------------------------------------- */}

      { isSearchFormDisplayed &&
        <>
          <SearchForm
            lang = { lang }
          />

          <div className = 'review-modal__overlay' onClick = { closeSearchForm }></div>
        </>
      }

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
                <Link href = { `/user/${ userData?.username }` }>
                  { userData?.given_name ? userData.given_name : userData?.username }
                </Link>
                { translate(lang, 'USER_HOME', 'WELCOME_TEXT', 'TEXT_RIGHT') }
              </h2>

              {/* ------------------------------------------------------ */}

              { followingList && followingList.length === 0
                ? <NewOnPlotscore lang = { lang } />
                : <NewFromFriends lang = { lang } followingListReviews = { followingListReviews } />
              }

              {/* ------------------------------------------------------ */}

              <section className = 'section__heading-and-content popular-reviews--home'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'USER_HOME'
                  section = 'POPULAR_REVIEWS'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = { translate(lang, 'USER_HOME', 'POPULAR_REVIEWS', 'MORE') }
                  hasDivider
                />

                <section className = 'section-content'>
                  <div className = 'left-column'>
                    { sixLatestReviews.filter((_, index) => index % 2 === 0).map((review, index, array) => {
                      const mediaLink = `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }`
                      const userLink = `/user/${ review.user_username }`

                      return(
                        <React.Fragment key = { index }>
                          <Review
                            lang = { lang }

                            hasPoster
                            posterLowResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }
                            posterHighResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }

                            mediaTitle = { review.media_title }
                            mediaYear = { review.media_release_date.slice(0, 4) }

                            avatarLowResImgSrc = { avatarSrc[0] }
                            avatarHighResImgSrc = { avatarSrc[0] }
                            username = { review.user_username }

                            rating = { review.rating }

                            reviewText = { review.review_text }

                            commentCount = { review.comment_count }
                            likeCount = { review.like_count }

                            mediaLink = { mediaLink }
                            userLink = { userLink }

                            type = 'horizontal-1'
                          />
                          { index !== array.length - 1 && <Divider /> }
                        </React.Fragment>
                      )
                    }) }
                  </div>
                  <div className = 'right-column'>
                    { sixLatestReviews.filter((_, index) => index % 2 !== 0).map((review, index, array) => {
                      const mediaLink = `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }`
                      const userLink = `/user/${ review.user_username }`

                      return (
                        <React.Fragment key = { index }>
                          <Review
                            lang = { lang }

                            hasPoster
                            posterLowResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }
                            posterHighResImgSrc = { posterSrc[Math.floor(Math.random() * posterSrc.length)] }

                            mediaTitle = { review.media_title }
                            mediaYear = { review.media_release_date.slice(0, 4) }

                            avatarLowResImgSrc = { avatarSrc[0] }
                            avatarHighResImgSrc = { avatarSrc[0] }
                            username = { review.user_username }

                            rating = { review.rating }

                            reviewText = { review.review_text }

                            commentCount = { review.comment_count }
                            likeCount = { review.like_count }

                            mediaLink = { mediaLink }
                            userLink = { userLink }

                            type = 'horizontal-1'
                          />
                          { index !== array.length - 1 && <Divider /> }
                        </React.Fragment>
                      )
                    }) }
                  </div>
                </section>
              </section>

              {/* ------------------------------------------------------ */}

              <section className = 'section__heading-and-content recent-stories'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'LANDING_PAGE'
                  section = 'RECENT_STORIES'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = { translate(lang, 'LANDING_PAGE', 'RECENT_STORIES', 'MORE') }
                  hasDivider
                />

                <section className = 'section-content'>
                  <section className = 'recent-stories__column-1'>
                    { recentStoriesSlotsData.map((story, index) => (
                      story.column === 1 && (
                        <RecentStory
                          key = { index }

                          lang = { lang }

                          { ...story }
                        />
                      )
                    )) }
                  </section>

                  <section className = 'recent-stories__column-2'>
                    { recentStoriesSlotsData.map((story, index) => (
                      story.column === 2 && (
                        <RecentStory
                          key = { index }

                          lang = { lang }

                          { ...story }
                        />
                      )
                    )) }
                  </section>

                  <section className = 'recent-stories__column-3'>
                    { recentStoriesSlotsData.map((story, index) => (
                      story.column === 3 && (
                        <RecentStory
                          key = { index }

                          lang = { lang }

                          { ...story }
                        />
                      )
                    )) }
                  </section>
                </section>

                {/* ------------------------------------- */}

                <section className = 'section-content--mobile'>
                  { recentStoriesSlotsData.map((story, index) => (
                    <RecentStory
                      key = { index }

                      lang = { lang }

                      {...story }
                    />
                  )) }
                </section>
              </section>

              
              {/* ---------------------------------------------------- */}

              <section className = 'section__heading-and-content recent-showdowns'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'LANDING_PAGE'
                  section = 'RECENT_SHOWDOWNS'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = { translate(lang, 'LANDING_PAGE', 'RECENT_SHOWDOWNS', 'MORE') }
                  hasDivider
                />

                <section className = 'section-content'>
                  { recentShowdownsSlotsData.map((showdown, index) => (
                    <RecentShowdownNews
                      className = { showdown.inProgress ? 'recent-showdown--in-progress' : '' }

                      key = { index }

                      lang = { lang }

                      { ...showdown }
                    />
                  )) }
                </section>
              </section>

              {/* ---------------------------------------------------- */}

              <section className = 'section__heading-and-content recent-news'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'LANDING_PAGE'
                  section = 'RECENT_NEWS'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = { translate(lang, 'LANDING_PAGE', 'RECENT_NEWS', 'MORE') }
                  hasDivider
                />

                <section className = 'section-content'>
                  { recentNewsSlotsData.map((news, index) => (
                    <RecentShowdownNews
                      key = { index }

                      { ...news }
                    />
                  )) }
                </section>
              </section>
            </section>
          </main>
        </section>

        <Footer lang = { lang} />
      </section>
    </>
  )
}
