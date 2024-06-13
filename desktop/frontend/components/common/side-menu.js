import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import {
  IconBadgeAdOff,
  IconBulbFilled,
  IconBulbOff,
  IconClockPlay,
  IconHeartFilled,
  IconList,
  IconLogout,
  IconMenu,
  IconMovie,
  IconSettings,
  IconX
} from '@tabler/icons-react'

import {
  CircleFlagsEs,
  CircleFlagsUk
} from '/components/common/main-action-button.js'
import avatarSrc from '/src/app/static-info/common/avatar-srcs.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/side-menu.css'

export default function SideMenu({
  lang,
  handleLanguageChange,
  theme,
  handleThemeChange,
  userData,
  handleLogout
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleMouseEnter = () => {
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    setIsExpanded(false)
  }

  /* ------------------------------- */

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <div className = 'side-menu__button' onClick = { toggleMenu }>
        <IconMenu />
      </div>

      <div className = { `side-menu__overlay ${ isMobileMenuOpen ? 'active' : '' }` } onClick = { toggleMenu }></div>

      <div
        className = { `side-menu ${ isExpanded ? 'side-menu--expanded' : '' } ${ isMobileMenuOpen ? 'active' : '' }` }
        onMouseEnter = { handleMouseEnter }
        onMouseLeave = { handleMouseLeave }
      >
        <div className = 'side-menu--close-button'>
          <IconX onClick = { toggleMenu } />
        </div>

        {/* -------------------------------------------------------------- */}

        <Link className = 'side-menu__user' href = { `/user/${ userData?.username }` }>
          <Image
            className = 'side-menu__avatar'
            src = { avatarSrc[0] }
            width = { 50 }
            height = { 50 }
            alt = 'avatar'
          />
          {
            isExpanded &&
              <span>
                {
                  userData
                    ? userData.username
                    : 'username'
                }
              </span>
          }
        </Link>

        <div className = 'side-menu__divider'></div>

        {/* -------------------------------------------------------------- */}

        <section className = 'side-menu__main-actions'>
          <div className = 'side-menu__option'>
            {
              theme === 'dark'
                ? <IconBulbFilled onClick = { handleThemeChange } />
                : <IconBulbOff onClick = { handleThemeChange } />
            }
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleThemeChange }>
              {
                theme === 'dark'
                  ? translate(lang, 'COMMON', 'SIDE_MENU', 'SWITCH_TO_LIGHT_MODE')
                  : translate(lang, 'COMMON', 'SIDE_MENU', 'SWITCH_TO_DARK_MODE')
              }
            </span>
          </div>
          <div className = 'side-menu__option'>
            {
              lang === 'en'
                ? <CircleFlagsEs onClick = { handleLanguageChange } />
                : <CircleFlagsUk onClick = { handleLanguageChange } />
            }
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleLanguageChange }>
              {
                lang === 'en'
                  ? translate(lang, 'COMMON', 'SIDE_MENU', 'CHANGE_TO_SPANISH')
                  : translate(lang, 'COMMON', 'SIDE_MENU', 'CHANGE_TO_ENGLISH')
              }
            </span>
          </div>
        </section>

        <div className = 'side-menu__divider'></div>

        {/* -------------------------------------------------------------- */}

        <section className = 'side-menu__tabs'>
          <div className = 'side-menu__option'>
            <IconMovie />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'MEDIA') }
            </span>
          </div>
          <div className = 'side-menu__option'>
            <IconList />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LISTS') }
            </span>
          </div>
          <div className = 'side-menu__option'>
            <IconClockPlay />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'WATCHLIST') }
            </span>
          </div>
          <div className = 'side-menu__option'>
            <IconHeartFilled />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LIKES') }
            </span>
          </div>
        </section>

        <div className = 'side-menu__divider'></div>

        {/* -------------------------------------------------------------- */}

        <section className = 'side-menu__options'>
          <Link className = 'side-menu__option' href = '/settings'>
            <IconSettings />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'SETTINGS') }
            </span>
          </Link>
          <div className = 'side-menu__option'>
            <IconBadgeAdOff />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'GO_PRO') }
            </span>
          </div>
          <div className = 'side-menu__option'>
            <IconLogout onClick = { handleLogout } />
            <span className = { `side-menu__text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleLogout }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LOGOUT') }
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
