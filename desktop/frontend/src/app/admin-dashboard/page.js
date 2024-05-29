'use client'

import cookie from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import {
  IconChairDirector,
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
import SectionHeading from '/components/common/section-heading.js'
import SideMenu from '/components/common/side-menu.js'
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
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

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
        setTotalPages(data.totalPages)
      } else {
        throw new Error('failed to fetch users')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  /* ---------------------------------------------------- */

  const avatarSrc = 'https://secure.gravatar.com/avatar/98eadea62aa09a91132e66b5319c84d6?rating=PG&size=1000&border=&default=https%3A%2F%2Fs.ltrbxd.com%2Fstatic%2Fimg%2Favatar1000.a71b6e9c.png'

  /* ---------------------------------------------------- */

  const [isErrorModalDisplayed, setIsErrorModalDisplayed] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const openErrorModal = (user) => {
    setSelectedUser(user)
    setIsErrorModalDisplayed(true)
  }

  const closeErrorModal = () => {
    setIsErrorModalDisplayed(false)
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
        fetchUsers(currentPage)
      } else {
        throw new Error('failed to delete user')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteUserAndCloseModal = (id) => {
    handleDeleteUser(id)
    closeErrorModal()
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <Link href = '/new-admin'>
          <MainActionButton
            icon = { IconUserPlus }
          />
        </Link>
        <MainActionButton
          icon = { IconZoom }
          handleClick = { null }
        />
        <MainActionButton
          icon = { IconPencilPlus }
          handleClick = { null }
        />
      </div>

      {/* --------------------------------------------------------- */}

      {
        isErrorModalDisplayed &&
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
                onClick = { closeErrorModal }
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

          <div className = 'delete-user-modal__overlay' onClick = { closeErrorModal }></div>
        </>
      }

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

            <section className = 'content__logo-header'>
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
                            <Image
                              className = 'user-list__avatar'
                              // src = { `${ process.env.NEXT_PUBLIC_API_STORAGE_PATH }${ user.avatar }` }
                              src = { avatarSrc }
                              height = { 50 }
                              width = { 50 }
                              alt = 'user avatar'
                            />

                            <div className = 'user-list__info'>
                              <h4 className = { user.role === 'admin' ? 'user-list__admin-username' : null }>
                                { user.role === 'admin' ? <IconChairDirector /> : null }
                                { user.username }
                              </h4>
                              <p>
                                { user.follower_count}
                                { translate(
                                  lang,
                                  'ADMIN_DASHBOARD',
                                  'DATABASE_USER_LIST',
                                  'FOLLOWER_COUNT'
                                ) }
                              </p>
                            </div>
                          </section>

                          <section className = 'list__user-actions'>
                            <Link className = 'user-actions__edit' href = { `/edit-user/${user.id}` }>
                              <IconEdit />
                            </Link>

                            <button className = 'user-actions__delete' onClick = { () => openErrorModal(user) }>
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
                    <button className = 'pagination-controls__button' onClick = { handlePreviousPage } disabled = { currentPage === 1 }>
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_USER_LIST', 'PREVIOUS_PAGE') }
                    </button>

                    <div className = 'pagination-controls__numbers'>
                      {[...Array(totalPages)].map((_, page) => (
                        <h6
                          key = { page + 1 }
                          className = { `pagination-controls__number ${ page + 1 === currentPage ? 'pagination-controls__number--active' : '' }` }
                          onClick = { () => setCurrentPage(page + 1) }
                        >
                          { page + 1 }
                        </h6>
                      ))}
                    </div>

                    <button className = 'pagination-controls__button' onClick = { handleNextPage } disabled = { currentPage === totalPages} >
                      { translate(lang, 'ADMIN_DASHBOARD', 'DATABASE_USER_LIST', 'NEXT_PAGE') }
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
