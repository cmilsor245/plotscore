'use client'

import cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  IconChairDirector,
  IconDatabasePlus,
  IconEdit,
  IconPencilPlus,
  IconTrash,
  IconUserPlus,
  IconZoom
} from '@tabler/icons-react'

import Divider from '/components/common/divider.js'
import Footer from '/components/common/footer.js'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button.js'
import ReviewModal from '/components/common/review-modal.js'
import SearchForm from '/components/common/search-form.js'
import SectionHeading from '/components/common/section-heading.js'
import SideMenu from '/components/common/side-menu.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import posterSrc from '/src/app/static-info/common/poster-srcs.js'
import translate from '/src/app/translation.js'

import '/styles/pages/admin-dashboard.css'

export default function AdminDashboard({
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

  /* -------------------- */

  const [lang, setLang] = useState('en') // default language

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  /* ---------------------------------------------------- */

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [users, setUsers] = useState([])
  const [currentUsersPage, setCurrentUsersPage] = useState(1)
  const [totalUsersPages, setTotalUsersPages] = useState(1)

  useEffect(() => {
    fetchUsers(currentUsersPage)
  }, [currentUsersPage])

  const fetchUsers = async (page) => {
    try {
      const response = await fetch(`${ apiUrl }/all-users?page=${ page }`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setTotalUsersPages(data.totalPages)
      } else {
        throw new Error('failed to fetch users')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviousUsersPage = () => {
    if (currentUsersPage > 1) {
      setCurrentUsersPage(currentUsersPage - 1)
    }
  }

  const handleNextUsersPage = () => {
    if (currentUsersPage < totalUsersPages) {
      setCurrentUsersPage(currentUsersPage + 1)
    }
  }

  const [media, setMedia] = useState([])
  const [currentMediaPage, setCurrentMediaPage] = useState(1)
  const [totalMediaPages, setTotalMediaPages] = useState(1)

  useEffect(() => {
    fetchMedia(currentMediaPage)
  }, [currentMediaPage])

  const fetchMedia = async (page) => {
    try {
      const response = await fetch(`${ apiUrl }/all-media?page=${ page }`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })

      if (response.ok) {
        const data = await response.json()
        setMedia(data.media)
        setTotalMediaPages(data.totalPages)
      } else {
        throw new Error('failed to fetch media')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviousMediaPage = () => {
    if (currentMediaPage > 1) {
      setCurrentMediaPage(currentMediaPage - 1)
    }
  }

  const handleNextMediaPage = () => {
    if (currentMediaPage < totalMediaPages) {
      setCurrentMediaPage(currentMediaPage + 1)
    }
  }

  /* ---------------------------------------------------- */

  const [isDeleteUserModalDisplayed, setIsDeleteUserModalDisplayed] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const openDeleteUserModal = (user) => {
    setSelectedUser(user)
    setIsDeleteUserModalDisplayed(true)
  }

  const closeDeleteUserModal = () => {
    setIsDeleteUserModalDisplayed(false)
  }

  const handleDeleteUser = async (id) => {
    try {
      const response = await fetch(`${ apiUrl }/delete-user/${ id }`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })

      if (response.ok) {
        fetchUsers(currentUsersPage)
      } else {
        throw new Error('failed to delete user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUserAndCloseModal = (id) => {
    handleDeleteUser(id)
    closeDeleteUserModal()
  }

  const [isDeleteMediaModalDisplayed, setIsDeleteMediaModalDisplayed] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const openDeleteMediaModal = (media) => {
    setSelectedMedia(media)
    setIsDeleteMediaModalDisplayed(true)
  }

  const closeDeleteMediaModal = () => {
    setIsDeleteMediaModalDisplayed(false)
  }

  const handleDeleteMedia = async (id) => {
    try {
      const response = await fetch(`${ apiUrl }/delete-media/${ id }`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })

      if (response.ok) {
        fetchMedia(currentMediaPage)
      } else {
        throw new Error('failed to delete media')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteMediaAndCloseModal = (id) => {
    handleDeleteMedia(id)
    closeDeleteMediaModal()
  }

  /* ---------------------------------------------------- */

  const [isReviewModalDisplayed, setIsReviewModalDisplayed] = useState(false)

  const openReviewModal = () => {
    setIsReviewModalDisplayed(true)
  }

  const closeReviewModal = () => {
    setIsReviewModalDisplayed(false)
  }

  /* ---------------------------------------------------- */

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

    const mediaSlug = sluggedTitle + '-' + mediaYear

    setMediaSlug(mediaSlug)
    closeReviewModal()
    setTimeout(() => {
      setIsReviewCreationNotificationDisplayed(false)
      setMediaTitleForNotification('')
    }, 3000)
  }

  /* ---------------------------------------------------- */

  const generateListMediaSlug = (media) => {
    const sluggedTitle = convertToSlug(media.title)
    const mediaYear = media.release_date.substring(0, 4)

    return sluggedTitle + '-' + mediaYear
  }

  /* ---------------------------------------------------- */

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
        <Link href = '/new-media'>
          <MainActionButton
            icon = { IconDatabasePlus }
          />
        </Link>
        <Link href = '/new-admin'>
          <MainActionButton
            icon = { IconUserPlus }
          />
        </Link>
        <MainActionButton
          icon = { IconZoom }
          handleClick = { openSearchForm }
        />
        <MainActionButton
          icon = { IconPencilPlus }
          handleClick = { openReviewModal }
        />
      </div>

      {/* --------------------------------------------------------- */}

      { isSearchFormDisplayed &&
        <>
          <SearchForm
            lang = { lang }
          />

          <div className = 'review-modal__overlay' onClick = { closeSearchForm }></div>
        </>
      }

      {/* --------------------------------------------------------- */}

      { isDeleteUserModalDisplayed &&
        <>
          <div className = 'delete-user-modal'>
            <h2>
              { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_USER_MODAL', 'TITLE') }
            </h2>

            <p>
              { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_USER_MODAL', 'TEXT') } <span>{ selectedUser?.username }</span>?
            </p>

            <div className = 'delete-user-modal__buttons'>
              <button
                className = 'delete-user-modal__button delete-user-modal__button--cancel'
                onClick = { closeDeleteUserModal }
              >
                { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_USER_MODAL', 'CANCEL_BUTTON') }
              </button>

              <button
                className = 'delete-user-modal__button delete-user-modal__button--confirm'
                onClick = { () => handleDeleteUserAndCloseModal(selectedUser?.id) }
              >
                { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_USER_MODAL', 'CONFIRM_BUTTON') }
              </button>
            </div>
          </div>

          <div className = 'delete-user-modal__overlay' onClick = { closeDeleteUserModal }></div>
        </>
      }

      { isDeleteMediaModalDisplayed &&
        <>
          <div className = 'delete-media-modal'>
            <h2>
              { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_MEDIA_MODAL', 'TITLE') }
            </h2>

            <p>
              { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_MEDIA_MODAL', 'TEXT') } <span>{ selectedMedia?.title }</span>?
            </p>

            <div className = 'delete-media-modal__buttons'>
              <button
                className = 'delete-media-modal__button delete-media-modal__button--cancel'
                onClick = { closeDeleteMediaModal }
              >
                { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_MEDIA_MODAL', 'CANCEL_BUTTON') }
              </button>

              <button
                className = 'delete-media-modal__button delete-media-modal__button--confirm'
                onClick = { () => handleDeleteMediaAndCloseModal(selectedMedia?.id) }
              >
                { translate(lang, 'ADMIN_DASHBOARD', 'DELETE_MEDIA_MODAL', 'CONFIRM_BUTTON') }
              </button>
            </div>
          </div>

          <div className = 'delete-media-modal__overlay' onClick = { closeDeleteMediaModal }></div>
        </>
      }

      {/* --------------------------------------------------------- */}

      { isReviewModalDisplayed &&
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
        <Link href = { `/media/${ mediaSlug }` }>{ mediaTitleForNotification }</Link>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_2') }
      </div>

      {/* --------------------------------------------------------- */}

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
              <section className = 'section__heading-and-content database-user-list'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'ADMIN_DASHBOARD'
                  section = 'DATABASE_USER_LIST'
                  title = 'SECTION_TITLE'
                  hasDivider
                />

                <section className = 'section-content'>
                  <ul>
                    { users.map((user, index) => (
                      <React.Fragment key = { index }>
                        <li key = { user.id }>
                          <section className = 'user-list__attributes'>
                            <Link className = 'user-list__profile-link' href = { `/user/${ user.username }` }>
                              <Image
                                className = 'user-list__avatar'
                                // src = { `${ process.env.NEXT_PUBLIC_API_STORAGE_PATH }${ user.avatar }` }
                                src = { avatarSrc[0] }
                                height = { 50 }
                                width = { 50 }
                                alt = 'user avatar'
                              />
                            </Link>

                            <div className = 'user-list__info'>
                              <Link className = 'user-list__profile-link' href = { `/user/${ user.username }` }>
                                <h4 className = { user.role === 'admin' ? 'user-list__admin-username' : null }>
                                  { user.role === 'admin' ? <IconChairDirector /> : null }
                                  { user.username }
                                </h4>
                              </Link>
                              <p>
                                { user.follower_count}
                                { translate(
                                  lang,
                                  'ADMIN_DASHBOARD',
                                  'DATABASE_USER_LIST',
                                  'FOLLOWER_COUNT'
                                ) },
                                { translate(
                                  lang,
                                  'ADMIN_DASHBOARD',
                                  'DATABASE_USER_LIST',
                                  'FOLLOWING_COUNT'
                                ) }
                                { user.following_count }
                              </p>
                            </div>
                          </section>

                          <section className = 'list__user-actions'>
                            <Link className = 'user-actions__edit' href = { `/admin-dashboard/edit-user/${ user.username }` }>
                              <IconEdit />
                            </Link>

                            <button className = 'user-actions__delete' onClick = { () => openDeleteUserModal(user) }>
                              <IconTrash />
                            </button>
                          </section>
                        </li>

                        { index < users.length - 1 && <Divider /> }
                      </React.Fragment>
                    )) }
                  </ul>

                  {/* ---------------------------------- */}

                  <section className = 'user-list__pagination-controls'>
                    <button className = 'pagination-controls__button' onClick = { handlePreviousUsersPage } disabled = { currentUsersPage === 1 }>
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_USER_LIST', 'PREVIOUS_PAGE') }
                    </button>

                    <div className = 'pagination-controls__numbers'>
                      { [...Array(totalUsersPages)].map((_, page) => (
                        <h6
                          key = { page + 1 }
                          className = { `pagination-controls__number ${ page + 1 === currentUsersPage ? 'pagination-controls__number--active' : '' }` }
                          onClick = { () => setCurrentUsersPage(page + 1) }
                        >
                          { page + 1 }
                        </h6>
                      )) }
                    </div>

                    <button className = 'pagination-controls__button' onClick = { handleNextUsersPage } disabled = { currentUsersPage === totalUsersPages } >
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_USER_LIST', 'NEXT_PAGE') }
                    </button>
                  </section>
                </section>
              </section>

              {/* --------------------------------------------------------------------------------- */}

              <section className = 'section__heading-and-content database-media-list'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'ADMIN_DASHBOARD'
                  section = 'DATABASE_MEDIA_LIST'
                  title = 'SECTION_TITLE'
                  hasDivider
                />

                <section className = 'section-content'>
                  <ul>
                    { media.map((mediaItem, index) => (
                      <React.Fragment key = { index }>
                        <li key = { mediaItem.id }>
                          <section className = 'media-list__attributes'>
                            <Link href = { `/media/${ generateListMediaSlug(mediaItem) }` } className = 'media-list__media-link'>
                              <Image
                                className = 'media-list__poster'
                                // src = { `${ process.env.NEXT_PUBLIC_API_STORAGE_PATH }${ mediaItem.poster }` }
                                src = { posterSrc[0] }
                                height = { 120 }
                                width = { 80 }
                                alt = 'media poster'
                              />
                            </Link>

                            <div className = 'media-list__info'>
                              <Link href = { `/media/${ generateListMediaSlug(mediaItem) }` } className = 'media-list__media-link'>
                                <h4>
                                  { mediaItem.title }
                                </h4>
                              </Link>
                              <p>
                                {
                                  translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'TYPE')
                                }
                                {
                                  mediaItem.type === 'movie' && translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'MOVIE')
                                }
                                {
                                  mediaItem.type === 'series' && translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'TV_SERIES')
                                }
                                ,
                                {
                                  translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'RELEASED_ON')
                                }
                                {
                                  mediaItem.release_date
                                }
                              </p>
                            </div>
                          </section>

                          <section className = 'list__media-actions'>
                            <Link className = 'media-actions__edit' href = { `` }>
                              <IconEdit />
                            </Link>

                            <button className = 'media-actions__delete' onClick = { () => openDeleteMediaModal(media) }>
                              <IconTrash />
                            </button>
                          </section>
                        </li>

                        { index < media.length - 1 && <Divider /> }
                      </React.Fragment>
                    )) }
                  </ul>

                  {/* ---------------------------------- */}

                  <section className = 'media-list__pagination-controls'>
                    <button className = 'pagination-controls__button' onClick = { handlePreviousMediaPage } disabled = { currentMediaPage === 1 }>
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'PREVIOUS_PAGE') }
                    </button>

                    <div className = 'pagination-controls__numbers'>
                      { [...Array(totalMediaPages)].map((_, page) => (
                        <h6
                          key = { page + 1 }
                          className = { `pagination-controls__number ${ page + 1 === currentMediaPage ? 'pagination-controls__number--active' : '' }` }
                          onClick = { () => setCurrentMediaPage(page + 1) }
                        >
                          { page + 1 }
                        </h6>
                      )) }
                    </div>

                    <button className = 'pagination-controls__button' onClick = { handleNextMediaPage } disabled = { currentMediaPage === totalMediaPages } >
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_MEDIA_LIST', 'NEXT_PAGE') }
                    </button>
                  </section>
                </section>
              </section>
            </section>
          </main>
        </section>

        <Footer lang = { lang } />
      </section>
    </>
  )
}
