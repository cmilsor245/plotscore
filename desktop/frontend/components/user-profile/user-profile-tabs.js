import { useState } from 'react'

import ActivityTab from '/components/user-profile/tabs/activity.js'
import DiaryTab from '/components/user-profile/tabs/diary.js'
import LikesTab from '/components/user-profile/tabs/likes.js'
import ListsTab from '/components/user-profile/tabs/lists.js'
import MediaTab from '/components/user-profile/tabs/media.js'
import NetworkTab from '/components/user-profile/tabs/network.js'
import ProfileTab from '/components/user-profile/tabs/profile.js'
import ReviewsTab from '/components/user-profile/tabs/reviews.js'
import TagsTab from '/components/user-profile/tabs/tags.js'
import WatchlistTab from '/components/user-profile/tabs/watchlist.js'
import translate from '/src/app/translation.js'

import '/styles/components/user-profile/user-profile-tabs.css'

function UserProfileTab({ lang, name }) {
  let conditionalComponent
  switch (name.toLowerCase()) {
    case 'profile':
      conditionalComponent = <ProfileTab lang = { lang } />
      break
    case 'activity':
      conditionalComponent = <ActivityTab lang = { lang } />
      break
    case 'media':
      conditionalComponent = <MediaTab lang = { lang } />
      break
    case 'diary':
      conditionalComponent = <DiaryTab lang = { lang } />
    case 'reviews':
      conditionalComponent = <ReviewsTab lang = { lang } />
      break
    case 'watchlist':
      conditionalComponent = <WatchlistTab lang = { lang } />
      break
    case 'lists':
      conditionalComponent = <ListsTab lang = { lang } />
      break
    case 'likes':
      conditionalComponent = <LikesTab lang = { lang } />
      break
    case 'tags':
      conditionalComponent = <TagsTab lang = { lang } />
      break
    case 'network':
      conditionalComponent = <NetworkTab lang = { lang } />
      break
    default:
      conditionalComponent = <ProfileTab lang = { lang } />
      break
  }

  return <>{conditionalComponent}</>
}

export default function UserProfileTabs({ lang }) {
  const [activeTab, setActiveTab] = useState('profile')

  const handleTabChange = (tab) => {
    setActiveTab(tab.toLowerCase())
  }

  const tabs = [
    'PROFILE',
    'ACTIVITY',
    'MEDIA',
    'DIARY',
    'REVIEWS',
    'WATCHLIST',
    'LISTS',
    'LIKES',
    'TAGS',
    'NETWORK'
  ]

  return (
    <>
      <ul className = 'user-profile__tabs'>
        { tabs.map(tab => (
          <li
            key = { tab }
            className = { `user-profile__tab ${ tab.toLowerCase() === activeTab ? 'active' : '' }` }
            onClick = { () => handleTabChange(tab) }
          >
            { translate(lang, 'PROFILE', 'TABS', tab) }
            { tab.toLowerCase() === activeTab && <div className = 'user-profile__tab-indicator' /> }
          </li>
        )) }
      </ul>

      <div className = 'user-profile__tab-content'>
        { tabs.map(tab => (
          <div key = { tab} style = {{ display: tab.toLowerCase() === activeTab ? 'block' : 'none' }}>
            <UserProfileTab lang = { lang } name = { tab.toLowerCase() } />
          </div>
        )) }
      </div>
    </>
  )
}
