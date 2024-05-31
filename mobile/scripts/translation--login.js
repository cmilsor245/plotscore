const translationsEN = {
  LOGIN_PAGE: {
    TITLE: {
      TEXT: 'Welcome back!'
    },
    FORM: {
      LOG_IN_BUTTON: 'Log in',
    },
    FALLBACK_TEXTS: {
      OR: 'or',
      SIGN_IN_WITH_GOOGLE: '<img src = "../assets/icons/account-forms/google.svg" alt = "google logo" /> Sign in with Google',

      FORGOT_PASSWORD: 'Forgot password?',
      SIGNUP_REDIRECT: 'Don\'t have an account? <a href = \'signup.html\'>Sign up</a>'
    }
  }
}

const translationsES = {
  LOGIN_PAGE: {
    TITLE: {
      TEXT: '¡Bienvenid@ de nuevo!'
    },
    FORM: {
      LOG_IN_BUTTON: 'Iniciar sesión',
    },
    FALLBACK_TEXTS: {
      OR: 'o',
      SIGN_IN_WITH_GOOGLE: '<img src = "../assets/icons/account-forms/google.svg" alt = "google logo" /> Iniciar sesión con Google',

      FORGOT_PASSWORD: '¿Has olvidado tu contraseña?',
      SIGNUP_REDIRECT: '¿No tienes una cuenta? <a href = \'signup.html\'>Regístrate</a>'
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
    { selector: '.welcome-back', namespace: 'LOGIN_PAGE', section: 'TITLE', key: 'TEXT' },

    { selector: '.login-button', namespace: 'LOGIN_PAGE', section: 'FORM', key: 'LOG_IN_BUTTON' },

    { selector: '.or-divider__text', namespace: 'LOGIN_PAGE', section: 'FALLBACK_TEXTS', key: 'OR' },
    { selector: '.sign-in-google', namespace: 'LOGIN_PAGE', section: 'FALLBACK_TEXTS', key: 'SIGN_IN_WITH_GOOGLE' },

    { selector: '.forgot-password', namespace: 'LOGIN_PAGE', section: 'FALLBACK_TEXTS', key: 'FORGOT_PASSWORD' },
    { selector: '.signup-redirect', namespace: 'LOGIN_PAGE', section: 'FALLBACK_TEXTS', key: 'SIGNUP_REDIRECT' }
  ]

  elementsToTranslate.forEach(item => {
    const element = document.querySelector(item.selector)
    if (element) {
      element.innerHTML = translate(lang, item.namespace, item.section, item.key)
    }
  })
}
