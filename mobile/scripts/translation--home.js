const translationsEN = {
  HOME: {
    NEW_RELEASES: {
      TITLE: 'new releases'
    }
  }
}

const translationsES = {
  HOME: {
    NEW_RELEASES: {
      TITLE: 'nuevos lanzamientos'
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
    { selector: '.new-releases__title', namespace: 'HOME', section: 'NEW_RELEASES', key: 'TITLE' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
