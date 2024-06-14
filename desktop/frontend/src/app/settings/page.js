'use client'

import cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  IconPencil,
  IconPencilPlus,
  IconZoom
} from '@tabler/icons-react'

import ButtonGeneral from '/components/common/button--general'
import Footer from '/components/common/footer'
import FormLabelInput from '/components/common/form--label-input'
import LogoHeader from '/components/common/logo-header.js'
import { MainActionButton } from '/components/common/main-action-button'
import MediaSlot from '/components/common/media-slot'
import ReviewModal from '/components/common/review-modal.js'
import SearchForm from '/components/common/search-form.js'
import SectionHeading from '/components/common/section-heading'
import SideMenu from '/components/common/side-menu.js'
import favoriteMediaSlotsImgsSrcs from '/src/app/static-info/settings/favoriteMediaSlotsImgsSrcs.js'
import translate from '/src/app/translation.js'

import '/styles/pages/settings.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

export default function SettingsPage() {
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

  /* ------------------------------- */

  const [lang, setLang] = useState('en') // default language

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  /* ------------------------------- */

  const [isReviewModalDisplayed, setIsReviewModalDisplayed] = useState(false)

  const openReviewModal = () => {
    setIsReviewModalDisplayed(true)
  }

  const closeReviewModal = () => {
    setIsReviewModalDisplayed(false)
  }

  /* ------------------------------- */

  const [isReviewCreationNotificationDisplayed, setIsReviewCreationNotificationDisplayed] = useState(false)
  const [mediaTitleForNotification, setMediaTitleForNotification] = useState('')
  const [mediaSlug, setMediaSlug] = useState('')

  const convertToSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const handleReviewCreatedNotification = (mediaTitle, releaseDate) => {
    setIsReviewCreationNotificationDisplayed(true)
    setMediaTitleForNotification(mediaTitle)

    const sluggedTitle = convertToSlug(mediaTitle)
    const mediaYear = releaseDate.substring(0, 4)

    console.log(sluggedTitle, mediaYear)

    const mediaSlug = sluggedTitle + '-' + mediaYear

    setMediaSlug(mediaSlug)
    closeReviewModal()
    setTimeout(() => {
      setIsReviewCreationNotificationDisplayed(false)
      setMediaTitleForNotification('')
    }, 3000)
  }

  /* ------------------------------- */

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${ apiUrl }/user`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    }

    fetchUserData()
  }, [apiUrl])

  /* ------------------------------- */

  const router = useRouter()

  const logout = async () => {
    await fetch(`${ apiUrl }/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    router.push('/')
  }

  /* ------------------------------- */

  const [isSaveChangesNotificationDisplayed, setIsSaveChangesNotificationDisplayed] = useState(false)

  const handleSaveChangesNotification = (e) => {
    // window.location.reload()
    setIsSaveChangesNotificationDisplayed(true)
    setTimeout(() => {
      setIsSaveChangesNotificationDisplayed(false)
    }, 3000)
  }

  /* ------------------------------ */

  const [isEditingUsername, setIsEditingUsername] = useState(false)

  const usernameMinLength = 3
  const usernameMaxLength = 100
  const givenNameMinLength = 1
  const givenNameMaxLength = 100
  const familyNameMinLength = 1
  const familyNameMaxLength = 100
  const emailMinLength = 3
  const emailMaxLength = 255
  const locationMinLength = 1
  const locationMaxLength = 255
  const websiteMinLength = 1
  const websiteMaxLength = 255
  const bioMinLength = 1
  const bioMaxLength = 255

  const handleEditUsername = () => {
    setIsEditingUsername(true)
  }

  const [username, setUsername] = useState('')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [bio, setBio] = useState('')
  const [pronouns, setPronouns] = useState('')

  const [postersConfiguration, setPostersConfiguration] = useState('')
  const [repliesConfiguration, setRepliesConfiguration] = useState('')
  const [includeInMembersSectionConfiguration, setIncludeInMembersSectionConfiguration] = useState('')
  const [adultContentConfiguration, setAdultContentConfiguration] = useState('')

  useEffect(() => {
    if (userData) {
      setUsername(userData.username || '')
      setGivenName(userData.given_name || '')
      setFamilyName(userData.family_name || '')
      setEmail(userData.email || '')
      setLocation(userData.location || '')
      setWebsite(userData.website || '')
      setBio(userData.bio || '')
      setPronouns(userData.pronouns || '')
      setPostersConfiguration(userData.posters_configuration || '')
      setRepliesConfiguration(userData.replies_configuration || '')
      setIncludeInMembersSectionConfiguration(userData.include_in_members_section_configuration || '')
      setAdultContentConfiguration(userData.adult_content_configuration || '')
    }
  }, [userData])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleGivenNameChange = (e) => {
    setGivenName(e.target.value)
  }

  const handleFamilyNameChange = (e) => {
    setFamilyName(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleWebsiteChange = (e) => {
    setWebsite(e.target.value)
  }

  const handleBioChange = (e) => {
    setBio(e.target.value)
  }

  const handlePronounsChange = (e) => {
    setPronouns(e.target.value)
  }

  const handlePostersConfigurationChange = (e) => {
    setPostersConfiguration(e.target.value)
  }

  const handleRepliesConfigurationChange = (e) => {
    setRepliesConfiguration(e.target.value)
  }

  const handleIncludeInMembersSectionConfigurationChange = (e) => {
    setIncludeInMembersSectionConfiguration(e.target.value)
  }

  const handleAdultContentConfigurationChange = (e) => {
    setAdultContentConfiguration(e.target.value)
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault()

    const bodyData = {
      username,
      given_name: givenName,
      family_name: familyName,
      email,
      location,
      website,
      bio,
      pronouns,

      postersConfiguration,
      repliesConfiguration,
      includeInMembersSectionConfiguration,
      adultContentConfiguration
    }

    try {
      await fetch(`${ apiUrl }/update-user/${ userData.id }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(bodyData)
      })

      handleSaveChangesNotification()
    } catch (error) {
      console.error(error)
    }
  }

  /* ----------------------------------------------- */

  const [isSearchFormDisplayed, setIsSearchFormDisplayed] = useState(false)

  const openSearchForm = () => {
    setIsSearchFormDisplayed(true)
  }

  const closeSearchForm = () => {
    setIsSearchFormDisplayed(false)
  }

  return (
    <>
      <div className = 'main-actions-buttons'>
        <MainActionButton
          icon = { IconZoom }
          handleClick = { openSearchForm }
        />
        <MainActionButton
          icon = { IconPencilPlus }
          handleClick = { openReviewModal }
        />
      </div>

      { isSearchFormDisplayed &&
        <>
          <SearchForm
            lang = { lang }
          />

          <div className = 'review-modal__overlay' onClick = { closeSearchForm }></div>
        </>
      }

      <div className = { `saved-changes-notification ${ isSaveChangesNotificationDisplayed ? 'showed' : '' }` }>
        { translate(lang, 'SETTINGS', 'SAVED_CHANGES_NOTIFICATION', 'TEXT') }
      </div>

      { isReviewModalDisplayed && userData && (
        <>
          <ReviewModal
            lang = { lang }
            userData = { userData }
            closeReviewModal = { closeReviewModal }
            handleReviewCreatedNotification = { handleReviewCreatedNotification }
          />
          <div className = 'review-modal__overlay'></div>
        </>
      )}

      <div className = { `review-modal__creation-notification ${ isReviewCreationNotificationDisplayed ? 'showed' : '' }` }>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_1') }
        <Link href = { `/media/${ mediaSlug }` }>{ mediaTitleForNotification }</Link>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_CREATED_2') }
      </div>

      <SideMenu
        lang = { lang }
        handleLanguageChange = { handleLanguageChange }
        theme = { theme }
        handleThemeChange = { handleThemeChange }
        userData = { userData }
        handleLogout = { logout }
      />

      <section className = 'common__content-footer with-top-padding'>
        <section className = 'common__content'>
          <main>
            <LogoHeader />

            <section className = 'content__logo-header common'>
              <div className = 'title-and-upgrade-message'>
                <h1>
                  { translate(lang, 'SETTINGS', 'MAIN_HEADING', 'TITLE') }
                </h1>

                <section className = 'upgrade-message-section'>
                  <p dangerouslySetInnerHTML = {{ __html: translate(lang, 'SETTINGS', 'MAIN_HEADING', 'UPGRADE_MESSAGE') }}></p>
                  <button>
                    { translate(lang, 'SETTINGS', 'MAIN_HEADING', 'BUTTON') }
                  </button>
                </section>
              </div>

              <section className = 'section__heading-and-content settings-form--main-info'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'SETTINGS'
                  section = 'MAIN_HEADING'
                  tabs = { [
                    'PROFILE',
                    'AUTH',
                    'AVATAR',
                    'CONNECTIONS',
                    'NOTIFICATIONS',
                    'STORES_STREAMING',
                    'DATA'
                  ] }
                  hasRightSideSingleText = { translate(lang, 'SETTINGS', 'MAIN_HEADING', 'DEACTIVATE_ACCOUNT') }
                  hasDivider
                />

                <section className = 'section-content'>
                  <h2>
                    { translate(lang, 'SETTINGS', 'MAIN_FORM', 'SUBTITLE') }
                  </h2>

                  <form className = 'account-settings__form' onSubmit = { handleSaveChanges }>
                    <section className = 'left-side'>
                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          disabled = { !isEditingUsername }

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'USERNAME_LABEL') }

                          minLength = { usernameMinLength }
                          maxLength = { usernameMaxLength }

                          placeholder = { userData?.username }

                          name = 'username'
                          id = 'account-settings__username'

                          onChange = { handleUsernameChange }
                          value = { username }
                        />
                        <CharacterCounter value = { username } maxLength = { usernameMaxLength } />
                        { !isEditingUsername &&
                          <IconPencil className = 'edit-username__button' onClick = { handleEditUsername } />
                        }
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group--double'>
                        <div className = 'account-settings__form-group'>
                          <FormLabelInput
                            label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'GIVEN_NAME_LABEL') }

                            minLength = { givenNameMinLength }
                            maxLength = { givenNameMaxLength }

                            placeholder = { userData?.given_name }

                            autoFocus

                            name = 'given_name'
                            id = 'account-settings__given_name'

                            onChange = { handleGivenNameChange }
                            value = { givenName }
                          />
                          <CharacterCounter value = { givenName } maxLength = { givenNameMaxLength } />
                        </div>
                        <div className = 'account-settings__form-group'>
                          <FormLabelInput
                            label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'FAMILY_NAME_LABEL') }

                            minLength = { familyNameMinLength }
                            maxLength = { familyNameMaxLength }

                            placeholder = { userData?.family_name }

                            name = 'family_name'
                            id = 'account-settings__family_name'

                            onChange = { handleFamilyNameChange }
                            value = { familyName }
                          />
                          <CharacterCounter value = { familyName } maxLength = { familyNameMaxLength } />
                        </div>
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'email'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'EMAIL_LABEL') }

                          minLength = { emailMinLength }
                          maxLength = { emailMaxLength }

                          placeholder = { userData?.email }

                          name = 'email'
                          id = 'account-settings__email'

                          onChange = { handleEmailChange }
                          value = { email }
                        />
                        <CharacterCounter value = { email } maxLength = { emailMaxLength } />
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group--double'>
                        <div className = 'account-settings__form-group'>
                          <FormLabelInput
                            label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'LOCATION_LABEL') }

                            minLength = { locationMinLength }
                            maxLength = { locationMaxLength }

                            placeholder = { userData?.location }

                            name = 'location'
                            id = 'account-settings__location'

                            onChange = { handleLocationChange }
                            value = { location }
                          />
                          <CharacterCounter value = { location } maxLength = { locationMaxLength } />
                        </div>
                        <div className = 'account-settings__form-group'>
                          <FormLabelInput
                            label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'WEBSITE_LABEL') }

                            minLength = { websiteMinLength }
                            maxLength = { websiteMaxLength }

                            placeholder = { userData?.website }

                            name = 'website'
                            id = 'account-settings__website'

                            onChange = { handleWebsiteChange }
                            value = { website }
                          />
                          <CharacterCounter value = { website } maxLength = { websiteMaxLength } />
                        </div>
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'textarea'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'BIO_LABEL') }

                          minLength = { bioMinLength }
                          maxLength = { bioMaxLength }

                          placeholder = { userData?.bio }

                          name = 'bio'
                          id = 'account-settings__bio'

                          onChange = { handleBioChange }
                          value = { bio }
                        />
                        <CharacterCounter value = { bio } maxLength = { bioMaxLength } />
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'pronouns'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'PRONOUNS_LABEL') }

                          name = 'pronouns'
                          id = 'account-settings__pronouns'

                          onChange = { handlePronounsChange }
                          value = { pronouns }
                        />
                      </div>

                      {/* ------------------- */}

                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'posters'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'POSTERS_LABEL') }

                          name = 'posters'
                          id = 'account-settings__posters'

                          onChange = { handlePostersConfigurationChange }
                          value = { postersConfiguration }
                        />
                      </div>
                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'replies'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'REPLIES_LABEL') }

                          name = 'replies'
                          id = 'account-settings__replies'

                          onChange = { handleRepliesConfigurationChange }
                          value = { repliesConfiguration }
                        />
                      </div>
                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'checkbox'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'MEMBERS_LABEL') }

                          name = 'members'
                          id = 'account-settings__members'

                          onChange = { handleIncludeInMembersSectionConfigurationChange }
                          value = { includeInMembersSectionConfiguration }
                        />
                      </div>
                      <div className = 'account-settings__form-group'>
                        <FormLabelInput
                          fieldType = 'checkbox'

                          label = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'ADULT_CONTENT_LABEL') }

                          name = 'adult_content'
                          id = 'account-settings__adult_content'

                          onChange = { handleAdultContentConfigurationChange }
                          value = { adultContentConfiguration }
                        />
                      </div>

                      <ButtonGeneral
                        type = 'submit'
                        text = { translate(lang, 'SETTINGS', 'MAIN_FORM', 'SUBMIT_BUTTON') }
                        className = 'account-settings__submit-button highlighted'
                      />
                    </section>

                    {/* --------------------------------- */}

                    <section className = 'right-side'>
                      <SectionHeading
                        lang = { lang }
                        namespace = 'SETTINGS'
                        section = 'MAIN_FORM_RIGHT_SIDE'
                        title = 'FAVORITE_MEDIA'
                        hasRightSideSingleText = { translate(lang, 'SETTINGS', 'MAIN_FORM_RIGHT_SIDE', 'DRAG_TO_REORDER') }
                      />

                      <section className = 'section-content'>
                        { favoriteMediaSlotsImgsSrcs.map((slot, index) => (
                          <div className = 'favorite-media__slot' key = { index }>
                            <MediaSlot
                              size = 'medium'
                              { ...slot }
                            />
                          </div>
                        )) }
                      </section>
                    </section>
                  </form>
                </section>
              </section>
            </section>
          </main>
        </section>

        <Footer lang = { lang } />
      </section>
    </>
  )
}
