const translationsEN = {
  LANDING_PAGE: {
    ACCESS_BUTTONS: {
      SIGN_UP: 'get started',
      LOG_IN: 'log in'
    }
  }
}

const translationsES = {
  LANDING_PAGE: {
    ACCESS_BUTTONS: {
      SIGN_UP: 'registrarse',
      LOG_IN: 'iniciar sesión'
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
    { selector: '.signup-button', namespace: 'LANDING_PAGE', section: 'ACCESS_BUTTONS', key: 'SIGN_UP' },
    { selector: '.login-button', namespace: 'LANDING_PAGE', section: 'ACCESS_BUTTONS', key: 'LOG_IN' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
