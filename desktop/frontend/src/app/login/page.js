'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  IconBulbFilled,
  IconBulbOff,
  IconEyeCheck,
  IconX
} from '@tabler/icons-react'

import Footer from '/components/common/footer.js'
import FormLabelInput from '/components/common/form--label-input.js'
import {
  CircleFlagsEs,
  CircleFlagsUk,
  MainActionButton
} from '/components/common/main-action-button.js'
import translate from '/src/app/translation.js'

import '/styles/pages/login--signup.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

export default function LoginPage() {
  const [theme, setTheme] = useState('dark') // default color theme

  useEffect(() => {
    const storedLang = cookie.get('lang')
    const storedTheme = cookie.get('theme')

    if (storedLang) setLang(storedLang)
    if (storedTheme) setTheme(storedTheme)

    document.body.classList.add(theme + '-theme')

    return () => {
      document.body.classList.remove(theme + '-theme')
    }
  }, [theme])

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    cookie.set('theme', newTheme, { expires: 365 })
  }

  /* -------------------- */

  const [lang, setLang] = useState('en') // default language

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  /* ---------------------------------------------------- */

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const emailMinLength = 3
  const emailMaxLength = 255

  const passwordMinLength = 8
  const passwordMaxLength = 255

  /* -------------------- */

  const router = useRouter()
  const [errorModalDisplayed, setErrorModalDisplayed] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const submit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${ apiUrl }/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    })

    if (!response.ok) {
      setErrorModalDisplayed(true)
      return
    }

    router.push('/')
  }

  const handleNotificationClose = () => setErrorModalDisplayed(false)

  /* ---------------------------------------------------- */

  const lowResImageSrc = '/img/login-page/low-res--background.webp'
  const highResImageSrc = '/img/login-page/high-res--background.webp'

  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const highResImage = new Image()
    highResImage.src = highResImageSrc
    highResImage.onload = () => {
      setImageLoaded(true)
    }
  })

  const backgroundStyle = {
    backgroundImage: `url(${ imageLoaded ? highResImageSrc : lowResImageSrc })`
  }

  return (
    <>
      <div className = { `error-modal error-modal--login ${ errorModalDisplayed ? 'error-modal--displayed' : '' }` }>
        <p>
          { translate(lang, 'LOGIN_PAGE', 'ACCOUNT_FORM', 'ERROR_TEXT') }
        </p>

        <button className = 'error-modal__close-button' onClick = { handleNotificationClose }>
          <IconEyeCheck />
        </button>
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}

      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { lang === 'en' ? CircleFlagsEs : CircleFlagsUk }
          handleClick = { handleLanguageChange }
        />
        <MainActionButton
          icon = { theme === 'dark' ? IconBulbFilled : IconBulbOff }
          handleClick = { handleThemeChange }
        />
      </div>

      {/* -------------------------------------------------------------------------------------------------- */}

      <section className = 'login-page' style = { backgroundStyle }>
        <section className = 'login-page__content'>
          <article className = 'login__form-area'>
            <Link className = 'account-form__cancel-button login' href = '/'>
              <IconX />
            </Link>

            <h1
              className = 'account-form__title'
              dangerouslySetInnerHTML = {{
                __html: translate(
                  lang,
                  'LOGIN_PAGE',
                  'ACCOUNT_FORM',
                  'LOG_IN_TITLE'
                )
              }}
            ></h1>

            <form className = 'account-form login-form' onSubmit = { submit }>
              <div className = 'account-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'LOGIN_PAGE', 'ACCOUNT_FORM', 'EMAIL') }

                  minLength = { emailMinLength }
                  maxLength = { emailMaxLength }

                  name = 'account-form--email-address'
                  id = 'account-form--login__email-address'

                  onChange = { handleEmailChange }
                  onFocus = { e => e.target.select() }
                  required
                  autoFocus
                  type = 'email'
                  value = { email }
                />
                <CharacterCounter value = { email } maxLength = { emailMaxLength } />
              </div>

              <div className = 'account-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'LOGIN_PAGE', 'ACCOUNT_FORM', 'PASSWORD') }

                  minLength = { passwordMinLength }
                  maxLength = { passwordMaxLength }

                  name = 'account-form--password'
                  id = 'account-form--login__password'

                  onChange = { handlePasswordChange }
                  onFocus = { e => e.target.select() }
                  required
                  type = 'password'
                  value = { password }
                />
                <CharacterCounter value = { password } maxLength = { passwordMaxLength } />
              </div>

              <input
                className = 'account-form__submit'
                type = 'submit'
                value = { translate(lang, 'LOGIN_PAGE', 'ACCOUNT_FORM', 'LOG_IN_BUTTON') }
              />
            </form>
          </article>
        </section>
        <Footer lang = { lang } />
      </section>
    </>
  )
}
