const translationsEN = {
  PROFILE: {
    FAVORITE_MEDIA: {
      TITLE: 'favorite media',
    },
    RECENT_ACTIVITY: {
      TITLE: 'recent activity',
    },
    RECENT_REVIEWS: {
      TITLE: 'recent reviews',
      SUBTITLE: 'more',
      LIKES: 'No likes yet'
    }
  }
}

const translationsES = {
  PROFILE: {
    FAVORITE_MEDIA: {
      TITLE: 'contenidos favoritos',
    },
    RECENT_ACTIVITY: {
      TITLE: 'actividad reciente',
    },
    RECENT_REVIEWS: {
      TITLE: 'reviews recientes',
      SUBTITLE: 'ver más',
      LIKES: 'No hay likes aún'
    }
  }
}

function translate(lang, namespace, section, key) {
  switch (lang) {
    case 'en':
      return translationsEN[namespace][section][key] || key
    case 'es':
      return translationsES[namespace][section][key] || key
    default:
      return key
  }
}

function translatePage(lang) {
  const elementsToTranslate = [
    { selector: '.favorite-media__title', namespace: 'PROFILE', section: 'FAVORITE_MEDIA', key: 'TITLE' },

    { selector: '.recent-activity__title', namespace: 'PROFILE', section: 'RECENT_ACTIVITY', key: 'TITLE' },

    { selector: '.recent-reviews__title', namespace: 'PROFILE', section: 'RECENT_REVIEWS', key: 'TITLE' },
    { selector: '.recent-reviews__subtitle', namespace: 'PROFILE', section: 'RECENT_REVIEWS', key: 'SUBTITLE' },

    { selector: '.recent-reviews__like-count-text', namespace: 'PROFILE', section: 'RECENT_REVIEWS', key: 'LIKES' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
