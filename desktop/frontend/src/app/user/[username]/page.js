'use client'

import cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  IconBulbFilled,
  IconBulbOff,
  IconCopy,
  IconDots,
  IconLink,
  IconMapPin,
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import ButtonGeneral from '/components/common/button--general.js'
import Footer from '/components/common/footer'
import LogoHeader from '/components/common/logo-header.js'
import {
  CircleFlagsEs,
  CircleFlagsUk,
  MainActionButton
} from '/components/common/main-action-button'
import ReviewModal from '/components/common/review-modal.js'
import SearchForm from '/components/common/search-form.js'
import SideMenu from '/components/common/side-menu.js'
import VerticalDivider from '/components/common/vertical-divider.js'
import UserProfileTabs from '/components/user-profile/user-profile-tabs.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import translate from '/src/app/translation.js'

import '/styles/pages/user-profile.css'

export default function Profile() {
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

  const [usernameInUrl, setUsernameInUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsernameInUrl(window.location.pathname.split('/').pop())
    }
  }, [])

  const [isOwnProfilePage, setIsOwnProfilePage] = useState(false)

  const [ownUserData, setOwnUserData] = useState(null)
  const [totalOwnReviews, setTotalOwnReviews] = useState(0)
  const [totalMediaThisYearForOwnUser, setTotalMediaThisYearForOwnUser] = useState(0)

  const [otherUserData, setOtherUserData] = useState(null)
  const [totalOtherReviews, setTotalOtherReviews] = useState(0)
  const [totalMediaThisYearForOtherUser, setTotalMediaThisYearForOtherUser] = useState(0)

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        try {
          const ownUserResponse = await fetch(`${ apiUrl }/user`, {
            credentials: 'include'
          })

          const ownUserData = await ownUserResponse.json()
          setOwnUserData(ownUserData)

          /* ------- */

          const totalOwnReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ ownUserData.id }`, {
            credentials: 'include'
          })

          const totalOwnReviewsData = await totalOwnReviewsResponse.json()
          setTotalOwnReviews(totalOwnReviewsData.totalReviews)

          /* ------- */

          const totalMediaThisYearForOwnUserResponse = await fetch(`${ apiUrl }/get-this-year-reviews-for-user/${ ownUserData.id }`, {
            credentials: 'include'
          })

          const totalMediaThisYearForOwnUserData = await totalMediaThisYearForOwnUserResponse.json()
          setTotalMediaThisYearForOwnUser(totalMediaThisYearForOwnUserData.totalReviews)

          if (ownUserData.username === usernameInUrl) {
            setIsOwnProfilePage(true)
          } else {
            setIsOwnProfilePage(false)

            const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, {
              credentials: 'include'
            })

            const otherUserData = await otherUserResponse.json()
            setOtherUserData(otherUserData)

            /* ------ */

            const totalOtherReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ otherUserData.id }`, {
              credentials: 'include'
            })

            const totalOtherReviewsData = await totalOtherReviewsResponse.json()
            setTotalOtherReviews(totalOtherReviewsData.totalReviews)

            /* ------ */

            const totalMediaThisYearForOtherUserResponse = await fetch(`${ apiUrl }/get-this-year-reviews-for-user/${ otherUserData.id }`, {
              credentials: 'include'
            })

            const totalMediaThisYearForOtherUserData = await totalMediaThisYearForOtherUserResponse.json()
            setTotalMediaThisYearForOtherUser(totalMediaThisYearForOtherUserData.totalReviews)
          }
        } catch (error) {
          setIsLoggedIn(false)

          setIsOwnProfilePage(false)

          const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, {
            credentials: 'include'
          })

          const otherUserData = await otherUserResponse.json()
          setOtherUserData(otherUserData)

          /* ------ */

          const totalOtherReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ otherUserData.id }`, {
            credentials: 'include'
          })

          const totalOtherReviewsData = await totalOtherReviewsResponse.json()
          setTotalOtherReviews(totalOtherReviewsData.totalReviews)

          /* ------ */

          const totalMediaThisYearForOtherUserResponse = await fetch(`${ apiUrl }/get-this-year-reviews-for-user/${ otherUserData.id }`, {
            credentials: 'include'
          })

          const totalMediaThisYearForOtherUserData = await totalMediaThisYearForOtherUserResponse.json()
          setTotalMediaThisYearForOtherUser(totalMediaThisYearForOtherUserData.totalReviews)
        }
      } catch (error) {
        console.error('error fetching user data:', error)
      }
    }

    if (usernameInUrl) {
      fetchData()
    }
  }, [usernameInUrl, apiUrl])

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

  /* ------------------------------ */

  const [isDotsButtonOptionDisplayed, setIsDotsButtonOptionDisplayed] = useState(false)
  const [isLinkCopiedNotificationDisplayed, setIsLinkCopiedNotificationDisplayed] = useState(false)

  const displayDotsButtonOption = () => {
    setIsDotsButtonOptionDisplayed(!isDotsButtonOptionDisplayed)
  }

  const notifyProfileLinkCopied = () => {
    setIsLinkCopiedNotificationDisplayed(true)
    setTimeout(() => {
      setIsLinkCopiedNotificationDisplayed(false)
    }, 1500)
  }

  const copyUserProfileLink = () => {
    navigator.clipboard.writeText(window.location.href)
    notifyProfileLinkCopied()
  }

  /* ----------------------------- */

  const [activeTab, setActiveTab] = useState('profile')

  /* ----------------------------- */

  const [isOtherUserFollowed, setIsOtherUserFollowed] = useState(false)

  useEffect(() => {
    const checkIfOtherUserIsFollowed = async () => {
      try {
        const response = await fetch(`${ apiUrl }/check-if-following/${ otherUserData.id }`, {
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setIsOtherUserFollowed(data.isFollowing)
        }
      } catch (error) {
        console.error('error checking if other user is followed:', error)
      }
    }

    if (otherUserData && otherUserData.id) {
      checkIfOtherUserIsFollowed()
    }
  })

  const unfollowUser = async () => {
    try {
      const response = await fetch(`${ apiUrl }/unfollow/${ otherUserData.id }`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.ok) {
        setIsOtherUserFollowed(false)
      }

      const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, {
        credentials: 'include'
      })

      const otherUserDataUpdated = await otherUserResponse.json()
      setOtherUserData(otherUserDataUpdated)
    } catch (error) {
      console.error('error unfollowing user:', error)
    }
  }

  const followUser = async () => {
    if (!isLoggedIn) {
      router.push('/login')
    }

    try {
      const response = await fetch(`${ apiUrl }/follow/${ otherUserData.id }`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      if (response.ok) {
        setIsOtherUserFollowed(true)
      }

      const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, {
        credentials: 'include'
      })

      const otherUserDataUpdated = await otherUserResponse.json()
      setOtherUserData(otherUserDataUpdated)
    } catch (error) {
      console.error('error following user:', error)
    }
  }

  /* ----------------------------- */

  const [mainButtonHovered, setMainButtonHovered] = useState(false)

  const handleMainButtonHover = () => {
    setMainButtonHovered(true)
  }

  const handleMainButtonLeave = () => {
    setMainButtonHovered(false)
  }

  /* ------------------------------ */

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
        { isLoggedIn ? (
          <>
            <MainActionButton
              icon = { IconZoom }
              handleClick = { openSearchForm }
            />
            <MainActionButton
              icon = { IconPencilPlus }
              handleClick = { openReviewModal }
            />
          </>
        ) : (
          <>
            <MainActionButton
              icon = { lang === 'en' ? CircleFlagsEs : CircleFlagsUk }
              handleClick = { handleLanguageChange }
            />
            <MainActionButton
              icon = { theme === 'dark' ? IconBulbFilled : IconBulbOff }
              handleClick = { handleThemeChange }
            />
          </>
        ) }
      </div>

      { isReviewModalDisplayed && ownUserData && (
        <>
          <ReviewModal
            lang = { lang }
            userData = { ownUserData }
            closeReviewModal = { closeReviewModal }
            handleReviewCreatedNotification = { handleReviewCreatedNotification }
          />
          <div className = 'review-modal__overlay'></div>
        </>
      ) }

      { isSearchFormDisplayed &&
        <>
          <SearchForm
            lang = { lang }
          />

          <div className = 'review-modal__overlay' onClick = { closeSearchForm }></div>
        </>
      }

      <div className = { `review-modal__creation-notification ${ isReviewCreationNotificationDisplayed ? 'showed' : '' }` }>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_1') }
        <Link href = { `/media/${ mediaSlug }` }>{ mediaTitleForNotification }</Link>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_2') }
      </div>

      { ownUserData && (
        <SideMenu
          lang = { lang }
          handleLanguageChange = { handleLanguageChange }
          theme = { theme }
          handleThemeChange = { handleThemeChange }
          userData = { ownUserData }
          handleLogout = { logout }
        />
      ) }

        <div className = { `dots__option__notification ${ isLinkCopiedNotificationDisplayed ? 'showed' : '' }` }>
          { translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__LINK_COPIED') }
        </div>

      <section className = 'common__content-footer with-top-padding'>
        <section className = 'common__content profile-page'>
          <main>
            <LogoHeader />

            <section className = 'content__logo-header common'>
              <section className = 'main-info-and-stats'>
                <div className = 'details'>
                  <Image
                    className = 'profile__avatar'
                    src = { avatarSrc[0] }
                    width = { 120 }
                    height = { 120 }
                    alt = 'avatar'
                  />

                  <div className = 'details__attributes'>
                    <div className = 'first-row'>
                      <h2>
                        { isOwnProfilePage
                          ? ownUserData?.given_name ? ownUserData?.given_name : ownUserData?.username
                          : otherUserData?.given_name ? otherUserData?.given_name : otherUserData?.username
                        }
                      </h2>
                      { isOwnProfilePage ? (
                        <Link href = '/settings'>
                          <ButtonGeneral
                            text = { translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__EDIT_PROFILE') }
                          />
                        </Link>
                      ) : (
                        isOtherUserFollowed
                        ? (
                          <ButtonGeneral
                            className = { `${ mainButtonHovered ? 'unfollow' : 'following' }` }
                            text = { !mainButtonHovered
                              ? translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__FOLLOWING')
                              : translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__UNFOLLOW')
                            }
                            onMouseEnter = { handleMainButtonHover }
                            onMouseLeave = { handleMainButtonLeave }
                            onClick = { unfollowUser }
                          />
                        ) : (
                          <ButtonGeneral
                            text = { translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__FOLLOW') }
                            onClick = { followUser }
                          />
                        )
                      ) }
                      <div className = 'dots' onClick = { displayDotsButtonOption }>
                        <IconDots />

                        { isDotsButtonOptionDisplayed && (
                            <>
                              <div className = 'dots__option-wrapper'>
                                <div className = 'dots__option' onClick = { copyUserProfileLink }>
                                  <IconCopy />
                                  <span>
                                    { translate(lang, 'PROFILE', 'USER_DETAILS', 'PRIMARY_BUTTON__COPY_PROFILE_LINK') }
                                  </span>
                                </div>
                              </div>

                              <div className = 'dots-option__overlay'></div>
                            </>
                        ) }
                      </div>
                    </div>

                    {/* ------------- */}

                    { isOwnProfilePage ? (
                      ownUserData?.bio && (
                        <div className = 'second-row'>
                          <span dangerouslySetInnerHTML = {{ __html: ownUserData?.bio }}></span>
                        </div>
                      )
                    ) : (
                      otherUserData?.bio && (
                        <div className = 'second-row'>
                          <span dangerouslySetInnerHTML = {{ __html: otherUserData?.bio }}></span>
                        </div>
                      )
                    ) }

                    {/* ------------- */}

                    { isOwnProfilePage ? (
                      (ownUserData?.location || ownUserData?.website) && (
                        <div className = 'third-row'>
                          { ownUserData?.location &&
                            <div>
                              <IconMapPin stroke = { 1.5 } />
                              <span>
                                { ownUserData.location }
                              </span>
                            </div>
                          }
                          { ownUserData?.website &&
                            <div>
                              <IconLink stroke = { 1.5 } />
                              <Link
                                href = { ownUserData.website.startsWith('http') || ownUserData.website.startsWith('https') ? ownUserData.website : `https://${ ownUserData.website }` }
                                target = '_blank'
                                rel = 'noopener noreferrer'
                              >
                                { ownUserData.website.startsWith('http') || ownUserData.website.startsWith('https') ? ownUserData.website.split('://')[1].replace('www.', '') : ownUserData.website.replace('www.', '') }
                              </Link>
                            </div>
                          }
                        </div>
                      )
                    ) : (
                      (otherUserData?.location || otherUserData?.website) && (
                        <div className = 'third-row'>
                          { otherUserData?.location &&
                            <div>
                              <IconMapPin />
                              <span>
                                { otherUserData.location }
                              </span>
                            </div>
                          }
                          { otherUserData?.website &&
                            <div>
                              <IconLink />
                              <a
                                href = { otherUserData.website.startsWith('http') || otherUserData.website.startsWith('https') ? otherUserData.website : `https://${ otherUserData.website }` }
                                target = '_blank'
                                rel = 'noopener noreferrer'
                              >
                                { otherUserData.website.startsWith('http') || otherUserData.website.startsWith('https')? otherUserData.website.split('://')[1].replace('www.', '') : otherUserData.website.replace('www.', '') }
                              </a>
                            </div>
                          }
                        </div>
                      )
                    ) }
                  </div>
                </div>

                {/* --------------------------------------- */}

                <div className = 'stats'>
                  { isOwnProfilePage
                    ? (
                      <>
                        <div className = 'total-watched'>
                          <span>
                            { totalOwnReviews || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'TOTAL_WATCHES') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'total-this-year'>
                          <span>
                            { totalMediaThisYearForOwnUser || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'TOTAL_WATCHES_THIS_YEAR') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'following_count'>
                          <span>
                            { ownUserData?.following_count || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'FOLLOWING') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'followers_count'>
                          <span>
                            { ownUserData?.follower_count || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'FOLLOWERS') }
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className = 'total-watched'>
                          <span>
                            { totalOtherReviews || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'TOTAL_WATCHES') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'total-this-year'>
                          <span>
                            { totalMediaThisYearForOtherUser || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'TOTAL_WATCHES_THIS_YEAR') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'following_count'>
                          <span>
                            { otherUserData?.following_count || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'FOLLOWING') }
                          </span>
                        </div>

                        <VerticalDivider />

                        <div className = 'followers_count'>
                          <span>
                            { otherUserData?.follower_count || 0 }
                          </span>
                          <span>
                            { translate(lang, 'PROFILE', 'USER_DETAILS', 'FOLLOWERS') }
                          </span>
                        </div>
                      </>
                    )
                  }
                </div>
              </section>

              {/* --------------------------------------- */}

              <UserProfileTabs
                lang = { lang }
                activeTab = { activeTab }
                setActiveTab = { setActiveTab }
              />
            </section>
          </main>
        </section>

        <Footer lang = { lang } />
      </section>
    </>
  )
}
