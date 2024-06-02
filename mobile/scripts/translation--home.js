const translationsEN = {
  HOME: {
    NEW_RELEASES: {
      TITLE: 'new releases'
    },
    DIVE_BACK_IN: {
      TITLE: 'dive back in'
    },
    POPULAR_IN_PLOTSCORE: {
      TITLE: 'popular in plotscore'
    },
    POPULAR_REVIEWS: {
      TITLE: 'popular reviews'
    }
  }
}

const translationsES = {
  HOME: {
    NEW_RELEASES: {
      TITLE: 'nuevos lanzamientos'
    },
    DIVE_BACK_IN: {
      TITLE: 'continúa viendo'
    },
    POPULAR_IN_PLOTSCORE: {
      TITLE: 'popular en plotscore'
    },
    POPULAR_REVIEWS: {
      TITLE: 'reviews populares'
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
    { selector: '.new-releases__title', namespace: 'HOME', section: 'NEW_RELEASES', key: 'TITLE' },
    { selector: '.dive-back-in__title', namespace: 'HOME', section: 'DIVE_BACK_IN', key: 'TITLE' },
    { selector: '.popular-in-plotscore__title', namespace: 'HOME', section: 'POPULAR_IN_PLOTSCORE', key: 'TITLE' },
    { selector: '.popular-reviews__title', namespace: 'HOME', section: 'POPULAR_REVIEWS', key: 'TITLE' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
