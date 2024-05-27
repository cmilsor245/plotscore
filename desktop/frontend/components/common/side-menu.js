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
  IconMenu,
  IconMovie,
  IconSettings,
  IconX
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

  // const avatarSrc = `${ publicApiStoragePath }${ userData ? userData.avatar : '/storage/avatars/default.png' }`
  const avatarSrc = 'https://secure.gravatar.com/avatar/98eadea62aa09a91132e66b5319c84d6?rating=PG&size=1000&border=&default=https%3A%2F%2Fs.ltrbxd.com%2Fstatic%2Fimg%2Favatar1000.a71b6e9c.png'

  /* ------------------------------- */

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
      <div className = 'side-menu--button' onClick = { toggleMenu }>
        <IconMenu />
      </div>

      <div className = { `side-menu--overlay ${ isMobileMenuOpen ? 'active' : '' }` } onClick = { toggleMenu }></div>

      <div
        className = { `side-menu ${ isExpanded ? 'side-menu--expanded' : '' } ${ isMobileMenuOpen ? 'active' : '' }` }
        onMouseEnter = { handleMouseEnter }
        onMouseLeave = { handleMouseLeave }
      >
        <div className = 'side-menu--close-button'>
          <IconX onClick = { toggleMenu } />
        </div>

        {/* -------------------------------------------------------------- */}

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
                {
                  userData
                    ? userData.username
                    : 'username'
                }
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
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleThemeChange }>
              {
                theme === 'dark'
                  ? translate(lang, 'COMMON', 'SIDE_MENU', 'SWITCH_TO_LIGHT_MODE')
                  : translate(lang, 'COMMON', 'SIDE_MENU', 'SWITCH_TO_DARK_MODE')
              }
            </span>
          </div>
          <div className = 'side-menu--option'>
            {
              lang === 'en'
                ? <CircleFlagsEs onClick = { handleLanguageChange } />
                : <CircleFlagsUk onClick = { handleLanguageChange } />
            }
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleLanguageChange }>
              {
                lang === 'en'
                  ? translate(lang, 'COMMON', 'SIDE_MENU', 'CHANGE_TO_SPANISH')
                  : translate(lang, 'COMMON', 'SIDE_MENU', 'CHANGE_TO_ENGLISH')
              }
            </span>
          </div>
        </section>

        <div className = 'side-menu--divider'></div>

        {/* -------------------------------------------------------------- */}

        <section className = 'side-menu--tabs'>
          <div className = 'side-menu--option'>
            <IconMovie />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'MEDIA') }
            </span>
          </div>
          <div className = 'side-menu--option'>
            <IconList />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LISTS') }
            </span>
          </div>
          <div className = 'side-menu--option'>
            <IconClockPlay />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'WATCHLIST') }
            </span>
          </div>
          <div className = 'side-menu--option'>
            <IconHeartFilled />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LIKES') }
            </span>
          </div>
        </section>

        <div className = 'side-menu--divider'></div>

        {/* -------------------------------------------------------------- */}

        <section className = 'side-menu--options'>
          <div className = 'side-menu--option'>
            <IconSettings />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'SETTINGS') }
            </span>
          </div>
          <div className = 'side-menu--option'>
            <IconBadgeAdOff />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'GO_PRO') }
            </span>
          </div>
          <div className = 'side-menu--option'>
            <IconLogout onClick = { handleLogout } />
            <span className = { `side-menu--option--text ${ isExpanded ? 'expanded' : '' }` } onClick = { handleLogout }>
              { translate(lang, 'COMMON', 'SIDE_MENU', 'LOGOUT') }
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
