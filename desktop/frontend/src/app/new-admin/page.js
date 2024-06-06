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

import '/styles/pages/new-admin.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

export default function NewAdminPage() {
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const emailMinLength = 3
  const emailMaxLength = 255

  const usernameMinLength = 3
  const usernameMaxLength = 50

  const passwordMinLength = 8
  const passwordMaxLength = 255

  /* -------------------- */

  const router = useRouter()
  const [errorModalDisplayed, setErrorModalDisplayed] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const submit = async (e) => {
    e.preventDefault()

    try {
      await fetch(`${ apiUrl }/create-admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          username,
          password
        })
      })

      router.push('/')
    } catch (error) {
      // TODO: improve error handling: this is not actually catching the right error from the backend
      setErrorModalDisplayed(true)
    }
  }

  const handleNotificationClose = () => setErrorModalDisplayed(false)

  /* ---------------------------------------------------- */

  const lowResImageSrc = '/img/new-admin-page/low-res--background.webp'
  const highResImageSrc = '/img/new-admin-page/high-res--background.webp'

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
      <div className = { `error-modal error-modal--signup ${ errorModalDisplayed ? 'error-modal--displayed' : '' }` }>
        <p>
          { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'ERROR_TEXT') }
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

      <section className = 'new-admin-page' style = { backgroundStyle }>
        <section className = 'new-admin-page__content'>
          <article className = 'new-admin__form-area'>
            <Link className = 'account-form__cancel-button signup' href = '/'>
              <IconX />
            </Link>

            <h1
              className = 'account-form__title'
              dangerouslySetInnerHTML = {{
                __html: translate(
                  lang,
                  'NEW_ADMIN_PAGE',
                  'ACCOUNT_FORM',
                  'PAGE_TITLE'
                )
              }}
            ></h1>

            <form className = 'account-form new-admin-form' onSubmit = { submit }>
              <div className = 'account-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'EMAIL') }

                  minLength = { emailMinLength }
                  maxLength = { emailMaxLength }

                  name = 'account-form--email-address'
                  id = 'account-form--new-admin__email-address'

                  onChange = { handleEmailChange }
                  onFocus = { e => e.target.select() }
                  required
                  autoFocus
                  type = 'email'
                  value = { email }
                  placeholder = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'EMAIL_PLACEHOLDER') }
                />
                <CharacterCounter value = { email } maxLength = { emailMaxLength } />
              </div>

              <div className = 'account-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'USERNAME') }

                  minLength = { usernameMinLength }
                  maxLength = { usernameMaxLength }

                  name = 'account-form--username'
                  id = 'account-form--new-admin__username'

                  onChange = { handleUsernameChange }
                  onFocus = { e => e.target.select() }
                  required
                  value = { username }
                  placeholder = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'USERNAME_PLACEHOLDER') }
                />
                <CharacterCounter value = { username } maxLength = { usernameMaxLength } />
              </div>

              <div className = 'account-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'PASSWORD') }

                  minLength = { passwordMinLength }
                  maxLength = { passwordMaxLength }

                  name = 'account-form--password'
                  id = 'account-form--new-admin__password'

                  onChange = { handlePasswordChange }
                  onFocus = { e => e.target.select() }
                  required
                  type = 'password'
                  value = { password }
                  placeholder = { translate(lang, 'SIGNUP_PAGE', 'ACCOUNT_FORM', 'PASSWORD_PLACEHOLDER') }
                />
                <CharacterCounter value = { password } maxLength = { passwordMaxLength } />
              </div>

              <input
                className = 'account-form__submit'
                type = 'submit'
                value = { translate(lang, 'NEW_ADMIN_PAGE', 'ACCOUNT_FORM', 'SUBMIT_BUTTON') }
              />
            </form>
          </article>
        </section>
        <Footer lang = { lang } />
      </section>
    </>
  )
}
