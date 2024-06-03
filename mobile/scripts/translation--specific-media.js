const translationsEN = {
  SPECIFIC_MEDIA: {
    MAIN_INFO: {
      DIRECTED_BY: 'Directed by',
    },
    SYNOPSIS: {
      TITLE: 'A LONG TIME AGO IN A GALAXY FAR, FAR AWAY…',
      TEXT: 'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.'
    },
    POPULAR_REVIEWS: {
      TITLE: 'popular reviews',
      SUBTITLE: 'more',
    },
    RECENT_REVIEWS: {
      TITLE: 'recent reviews',
      SUBTITLE: 'more',
    }
  }
}

const translationsES = {
  SPECIFIC_MEDIA: {
    MAIN_INFO: {
      DIRECTED_BY: 'Dirigido por',
    },
    SYNOPSIS: {
      TITLE: 'HACE MUCHO TIEMPO EN UNA GALAXIA MUY, MUY LEJANA…',
      TEXT: 'La Princesa Leia es capturada y retenida como rehén por las malvadas fuerzas Imperiales en su esfuerzo por tomar el control del Imperio Galáctico. El aventurero Luke Skywalker y el apuesto capitán Han Solo se unen con el adorable dúo de robots R2-D2 y C-3PO para rescatar a la hermosa princesa y restaurar la paz y la justicia en el Imperio.'
    },
    POPULAR_REVIEWS: {
      TITLE: 'reviews populares',
      SUBTITLE: 'ver más',
    },
    RECENT_REVIEWS: {
      TITLE: 'reviews recientes',
      SUBTITLE: 'ver más',
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
    { selector: '.directed-by', namespace: 'SPECIFIC_MEDIA', section: 'MAIN_INFO', key: 'DIRECTED_BY' },

    { selector: '.synopsis-title', namespace: 'SPECIFIC_MEDIA', section: 'SYNOPSIS', key: 'TITLE' },
    { selector: '.synopsis', namespace: 'SPECIFIC_MEDIA', section: 'SYNOPSIS', key: 'TEXT' },

    { selector: '.specific-media__popular-reviews__title', namespace: 'SPECIFIC_MEDIA', section: 'POPULAR_REVIEWS', key: 'TITLE' },
    { selector: '.popular-reviews__subtitle', namespace: 'SPECIFIC_MEDIA', section: 'POPULAR_REVIEWS', key: 'SUBTITLE' },

    { selector: '.specific-media__recent-reviews__title', namespace: 'SPECIFIC_MEDIA', section: 'RECENT_REVIEWS', key: 'TITLE' },
    { selector: '.recent-reviews__subtitle', namespace: 'SPECIFIC_MEDIA', section: 'RECENT_REVIEWS', key: 'SUBTITLE' },
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
