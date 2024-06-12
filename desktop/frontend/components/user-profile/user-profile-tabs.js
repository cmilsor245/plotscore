import { useState } from 'react'

import ActivityTab from '/components/user-profile/tabs/activity.js'
import LikesTab from '/components/user-profile/tabs/likes.js'
import LitsTab from '/components/user-profile/tabs/lits.js'
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
  switch (name) {
    case 'profile':
      conditionalComponent = <ProfileTab lang = { lang } />
      break
    case 'activity':
      conditionalComponent = <ActivityTab lang = { lang } />
      break
    case 'media':
      conditionalComponent = <MediaTab lang = { lang } />
      break
    case 'reviews':
      conditionalComponent = <ReviewsTab lang = { lang } />
      break
    case 'watchlist':
      conditionalComponent = <WatchlistTab lang = { lang } />
      break
    case 'lits':
      conditionalComponent = <LitsTab lang = { lang } />
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
  const [activeTab, setActiveTab] = useState('PROFILE')

  const tabs = [
    'PROFILE',
    'ACTIVITY',
    'MEDIA',
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
            className = { `user-profile__tab ${ tab === activeTab ? 'active' : '' }` }
            onClick = { () => setActiveTab(tab) }
          >
            { translate(lang, 'PROFILE', 'TABS', tab) }
            { tab === activeTab && <div className = 'user-profile__tab-indicator' /> }
          </li>
        )) }
      </ul>

      <div className = 'user-profile__tab-content'>
        { tabs.map(tab => (
          <div key = { tab } style = {{ display: tab === activeTab ? 'block' : 'none' }}>
            <UserProfileTab lang = { lang } name = { tab } />
          </div>
        )) }
      </div>
    </>
  )
}
