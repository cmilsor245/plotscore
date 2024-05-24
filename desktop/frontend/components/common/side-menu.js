import Image from 'next/image'
import { useState } from 'react'

import {
  IconBadgeAdOff,
  IconBulbFilled,
  IconBulbOff,
  IconClockPlay,
  IconHeartFilled,
  IconList,
  IconLogout,
  IconMovie,
  IconSettings
} from '@tabler/icons-react'

import {
  CircleFlagsEs,
  CircleFlagsUk
} from '/components/common/main-action-button.js'
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
  const publicApiStoragePath = process.env.NEXT_PUBLIC_API_STORAGE_PATH

  const avatarSrc = `${ publicApiStoragePath }${ userData ? userData.avatar : '/storage/avatars/default.png' }`

  /* ------------------------------- */

  const [isExpanded, setIsExpanded] = useState(false)

  const handleMouseEnter = () => {
    setIsExpanded(true)
  }

  const handleMouseLeave = () => {
    setIsExpanded(false)
  }

  return (
    <div
      className = { `side-menu ${ isExpanded ? 'side-menu--expanded' : '' }` }
      onMouseEnter = { handleMouseEnter }
      onMouseLeave = { handleMouseLeave }
    >
      <section className = 'side-menu--user'>
        <Image
          className = 'side-menu--user--avatar'
          src = { avatarSrc }
          width = { 50 }
          height = { 50 }
          alt = 'avatar'
        />
        {
          isExpanded &&
            <span>
              { userData.username }
            </span>
        }
      </section>

      <div className = 'side-menu--divider'></div>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--main-actions'>
        <div className = 'side-menu--option'>
          {
            theme === 'dark'
              ? <IconBulbFilled onClick = { handleThemeChange } />
              : <IconBulbOff onClick = { handleThemeChange } />
          }
          {
            isExpanded &&
              <span onClick = { handleThemeChange }>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'THEME') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          {
            lang === 'en'
              ? <CircleFlagsEs onClick = { handleLanguageChange } />
              : <CircleFlagsUk onClick = { handleLanguageChange } />
          }
          {
            isExpanded &&
              <span onClick = { handleLanguageChange }>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'LANGUAGE') }
              </span>
          }
        </div>
      </section>

      <div className = 'side-menu--divider'></div>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--tabs'>
        <div className = 'side-menu--option'>
          <IconMovie />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'MEDIA') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          <IconList />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'LISTS') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          <IconClockPlay />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'WATCHLIST') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          <IconHeartFilled />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'LIKES') }
              </span>
          }
        </div>
      </section>

      <div className = 'side-menu--divider'></div>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--options'>
        <div className = 'side-menu--option'>
          <IconSettings />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'SETTINGS') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          <IconBadgeAdOff />
          {
            isExpanded &&
              <span>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'GO_PRO') }
              </span>
          }
        </div>
        <div className = 'side-menu--option'>
          <IconLogout onClick = { handleLogout } />
          {
            isExpanded &&
              <span onClick = { handleLogout }>
                { translate(lang, 'COMMON', 'SIDE_MENU', 'LOGOUT') }
              </span>
          }
        </div>
      </section>
    </div>
  )
}
