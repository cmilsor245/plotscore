const translationsEN = {
  SIGN_UP_PAGE: {
    TITLE: {
      TEXT: 'Create an account'
    },
    FORM: {
      SIGN_UP_BUTTON: 'get started',
    },
    FALLBACK_TEXTS: {
      OR: 'or',
      SIGN_UP_WITH_GOOGLE: '<img src = "../assets/icons/account-forms/google.svg" alt = "google logo" /> Sign up with Google',

      LOGIN_REDIRECT: 'Already have an account? <a href = \'login.html\'>Log in</a>',
      COMMUNITY_POLICY: 'By signing up, you agree to abide by our <span>community policy</span>.'
    }
  }
}

const translationsES = {
  SIGN_UP_PAGE: {
    TITLE: {
      TEXT: 'Crea una cuenta'
    },
    FORM: {
      SIGN_UP_BUTTON: 'registrarme',
    },
    FALLBACK_TEXTS: {
      OR: 'o',
      SIGN_UP_WITH_GOOGLE: '<img src = "../assets/icons/account-forms/google.svg" alt = "google logo" /> Continuar con Google',

      LOGIN_REDIRECT: '¿Ya tienes una cuenta? <a href = \'login.html\'>Iniciar sesión</a>',
      COMMUNITY_POLICY: 'Al registrarte, aceptas cumplir con nuestra <span>política comunitaria</span>.'
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
    { selector: '.welcome-text', namespace: 'SIGN_UP_PAGE', section: 'TITLE', key: 'TEXT' },

    { selector: '.signup-button', namespace: 'SIGN_UP_PAGE', section: 'FORM', key: 'SIGN_UP_BUTTON' },

    { selector: '.or-divider__text', namespace: 'SIGN_UP_PAGE', section: 'FALLBACK_TEXTS', key: 'OR' },
    { selector: '.sign-up-google', namespace: 'SIGN_UP_PAGE', section: 'FALLBACK_TEXTS', key: 'SIGN_UP_WITH_GOOGLE' },

    { selector: '.login-redirect', namespace: 'SIGN_UP_PAGE', section: 'FALLBACK_TEXTS', key: 'LOGIN_REDIRECT' },
    { selector: '.community-policy', namespace: 'SIGN_UP_PAGE', section: 'FALLBACK_TEXTS', key: 'COMMUNITY_POLICY' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
