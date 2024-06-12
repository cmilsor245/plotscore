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

import '/styles/pages/new-media.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

export default function NewMediaPage() {
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

  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  // const [poster, setPoster] = useState(null) // Poster related state
  const [type, setType] = useState('movie')

  const handleTitleChange = (e) => setTitle(e.target.value)
  const handleSynopsisChange = (e) => setSynopsis(e.target.value)
  const handleReleaseDateChange = (e) => setReleaseDate(e.target.value)
  // const handlePosterChange = (e) => setPoster(e.target.files[0]) // Poster related handler
  const handleTypeChange = (e) => {
    const selectedType = e.target.value
    let newType = selectedType
    if (selectedType === translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'MOVIE')) {
      newType = 'movie'
    } else if (selectedType === translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'TV_SERIES')) {
      newType = 'series'
    }
    setType(newType)
  }

  const titleMinLength = 1
  const titleMaxLength = 255

  const synopsisMinLength = 1
  const synopsisMaxLength = 255

  /* -------------------- */

  const router = useRouter()
  const [errorModalDisplayed, setErrorModalDisplayed] = useState(false)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const submit = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('synopsis', synopsis)
      formData.append('release_date', releaseDate)
      // formData.append('poster', poster)
      formData.append('type', type)

      await fetch(`${ apiUrl }/create-media`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      })

      router.push('/')
    } catch (error) {
      setErrorModalDisplayed(true)
    }
  }

  const handleNotificationClose = () => setErrorModalDisplayed(false)

  /* ---------------------------------------------------- */

  const lowResImageSrc = '/img/new-media-page/low-res--background.webp'
  const highResImageSrc = '/img/new-media-page/high-res--background.webp'

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
          { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'ERROR_TEXT') }
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

      <section className = 'new-media-page' style = { backgroundStyle }>
        <section className = 'new-media-page__content'>
          <article className = 'new-media__form-area'>
            <Link className = 'new-media-form__cancel-button new-media' href = '/'>
              <IconX />
            </Link>

            <h1
              className = 'new-media-form__title'
              dangerouslySetInnerHTML = {{
                __html: translate(
                  lang,
                  'NEW_MEDIA_PAGE',
                  'FORM',
                  'PAGE_TITLE'
                )
              }}
            ></h1>

            <form className = 'new-media-form' onSubmit = { submit } encType = 'multipart/form-data'>
              <div className = 'new-media-form__group'>
                <FormLabelInput
                  label = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'TITLE_INPUT') }

                  minLength = { titleMinLength }
                  maxLength = { titleMaxLength }

                  name = 'new-media-form--title'
                  id = 'new-media-form__title'

                  onChange = { handleTitleChange }
                  onFocus = { e => e.target.select() }
                  required
                  placeholder = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'TITLE_INPUT_PLACEHOLDER') }
                  autoFocus
                  value = { title }
                />
                <CharacterCounter value = {  title } maxLength = { titleMaxLength } />
              </div>

              <div className = 'new-media-form__group'>
                <FormLabelInput
                  fieldType = 'textarea'

                  label = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'SYNOPSIS') }

                  minLength = { synopsisMinLength }
                  maxLength = { synopsisMaxLength }

                  name = 'new-media-form--synopsis'
                  id = 'new-media-form__synopsis'

                  onChange = { handleSynopsisChange }
                  onFocus = { e => e.target.select() }
                  required
                  placeholder = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'SYNOPSIS_PLACEHOLDER') }
                  value = { synopsis }
                />
                <CharacterCounter value = { synopsis } maxLength = { synopsisMaxLength } />
              </div>

              <div className = 'new-media-form__group'>
                <FormLabelInput
                  fieldType = 'date'

                  label = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'RELEASE_DATE') }

                  name = 'new-media-form--release-date'
                  id = 'new-media-form__release-date'

                  onChange = { handleReleaseDateChange }
                  required
                  value = { releaseDate }
                />
              </div>

              {/* <div className = 'new-media-form__group'>
                <FormLabelInput
                  fieldType = 'file'

                  lang = { lang }

                  label = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'POSTER') }

                  name = 'new-media-form--poster'
                  id = 'new-media-form__poster'

                  onChange = { handlePosterChange }
                  required
                />
              </div> */}

              <div className = 'new-media-form__group'>
                <FormLabelInput
                  fieldType = 'radio'

                  label = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'TYPE') }

                  name = 'new-media-form--type'
                  id = 'new-media-form__type'

                  options = { [
                    translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'MOVIE'),
                    translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'TV_SERIES'),
                  ] }

                  onChange = { handleTypeChange }
                  required
                />
              </div>

              <input
                className = 'new-media-form__submit'
                type = 'submit'
                value = { translate(lang, 'NEW_MEDIA_PAGE', 'FORM', 'SUBMIT_BUTTON') }
              />
            </form>
          </article>
        </section>
        <Footer lang = { lang } />
      </section>
    </>
  )
}
