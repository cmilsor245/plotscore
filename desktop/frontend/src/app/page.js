'use client'

import cookie from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  IconAlignLeft,
  IconBulbFilled,
  IconBulbOff,
  IconCalendarMonth,
  IconEye,
  IconHeartFilled,
  IconLayoutGridFilled,
  IconStarFilled
} from '@tabler/icons-react'

import Divider from '/components/common/divider.js'
import Footer from '/components/common/footer.js'
import List from '/components/common/list.js'
import {
  CircleFlagsEs,
  CircleFlagsUk,
  MainActionButton
} from '/components/common/main-action-button.js'
import MediaSlot from '/components/common/media-slot.js'
import Review from '/components/common/review.js'
import SectionHeading from '/components/common/section-heading.js'
import RecentShowdownNews from '/components/landing-page--home/recent--showdown-news.js'
import RecentStory from '/components/landing-page--home/recent-story.js'
import Backdrop from '/components/landing-page--specific-media/backdrop.js'
import AccountForm from '/components/landing-page/account-form.js'
import {
  MaterialSymbolsAndroidDarkTheme,
  MaterialSymbolsAndroidLightTheme,
  MdiAppleDarkTheme,
  MdiAppleLightTheme
} from '/components/landing-page/also-available.js'
import PlotscoreLetsYouCard from '/components/landing-page/plotscore-lets-you--card.js'
import PopularReviewer from '/components/landing-page/popular-reviewer.js'
import featuredMediaSlotsImgsSrcs from '/src/app/static-info/landing-page/featuredMediaSlotsImgsSrcs.js'
import justReviewedSlotsImgsSrcs from '/src/app/static-info/landing-page/justReviewedSlotsImgsSrcs.js'
import popularListsSlotsData from '/src/app/static-info/landing-page/popularListsSlotsData.js'
import popularReviewersSlotsData from '/src/app/static-info/landing-page/popularReviewersSlotsData.js'
import popularReviewsSlotsData from '/src/app/static-info/landing-page/popularReviewsSlotsData.js'
import recentNewsSlotsData from '/src/app/static-info/landing-page/recentNewsSlotsData.js'
import recentShowdownsSlotsData from '/src/app/static-info/landing-page/recentShowdownsSlotsData.js'
import recentStoriesSlotsData from '/src/app/static-info/landing-page/recentStoriesSlotsData.js'
import translate from '/src/app/translation.js'

import '/styles/global.css'
import '/styles/pages/landing-page--specific-media.css'

export default function LandingPage() {
  const [lang, setLang] = useState('en') // default language
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

  const handleLanguageChange = () => {
    const newLang = lang === 'en' ? 'es' : 'en'
    setLang(newLang)
    cookie.set('lang', newLang, { expires: 365 })
  }

  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    cookie.set('theme', newTheme, { expires: 365 })
  }

  /* ------------------------------ */

  const handleShowLoginForm = () => {
    document.querySelector('.account-form.login').classList.remove('hidden')
    
    document.querySelector('.account-form--overlay').classList.remove('hidden')

    document.querySelector('.nav--links--search-bar--mobile').classList.remove('open')

    // TODO: fix this line - it obligates the user to click the menu opening button twice after opening the form once
    document.querySelector('.nav--links--search-bar--mobile--overlay').classList.toggle('hidden')
  }

  const handleShowSignUpForm = () => {
    document.querySelector('.account-form.signup').classList.remove('hidden')

    document.querySelector('.account-form--overlay').classList.remove('hidden')

    document.querySelector('.nav--links--search-bar--mobile').classList.remove('open')

    // TODO: fix this line - it obligates the user to click the menu opening button twice after opening the form once
    document.querySelector('.nav--links--search-bar--mobile--overlay').classList.add('hidden')
  }

  const handleHideAccountForm = () => {
    document.querySelector('.account-form.login').classList.add('hidden')

    document.querySelector('.account-form.signup').classList.add('hidden')

    document.querySelector('.account-form--overlay').classList.add('hidden')

  }

  return (
    <>
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

      <AccountForm
        lang = { lang }

        type = 'signup'
      />

      <AccountForm
        lang = { lang }

        type = 'login'
      />

      <div
        className = 'account-form--overlay hidden'
        onClick = { handleHideAccountForm }
      ></div>

      {/* -------------------------------------------------------------------------------------------------- */}

      <section className = 'common--content-footer'>
        <section className = 'common--content-footer--content'>
          <Backdrop
            lowResImgSrc = '/img/landing-page--specific-media/low-res-backdrop.webp'
            highResImgSrc = '/img/landing-page--specific-media/high-res-backdrop.webp'
            hasHeader
            isInLandingPage
            lang = { lang }

            handleShowLoginForm = { handleShowLoginForm }
            handleShowSignUpForm = { handleShowSignUpForm }
          />

          <main>
            <section className = 'usp'>
              <h2 className = 'usp--main-text'>
                <span className = 'usp--main-text--default'>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__FIRST_LINE') }
                </span>
                <span className = 'usp--main-text--default'>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__SECOND_LINE') }
                </span>
                <span className = 'usp--main-text--default'>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'MAIN_TEXT__THIRD_LINE') }
                </span>

                {/* ------------------------------------------ */}

                <span className = 'usp--main-text--mobile'>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'MOBILE_LINE') }
                </span>
              </h2>

              <button className = 'usp--get-started-button' onClick = { handleShowSignUpForm }>
                { translate(lang, 'LANDING_PAGE', 'USP', 'GET_STARTED_BUTTON') }
              </button>

              <div className = 'usp--also-available'>
                <p>
                  { translate(lang, 'LANDING_PAGE', 'USP', 'ALSO_AVAILABLE') }
                </p>

                <div className = 'usp--also-available--icons'>
                  <span className = 'usp--also-available--icon'>
                    { theme === 'dark' ? <MdiAppleDarkTheme /> : <MdiAppleLightTheme /> }
                  </span>
                  <span className = 'usp--also-available--icon'>
                    { theme === 'dark' ? <MaterialSymbolsAndroidDarkTheme /> : <MaterialSymbolsAndroidLightTheme /> }
                  </span>
                </div>
              </div>
            </section>

            { /* ---------------------------------------------------- */ }

            <section className = 'featured-media'>
              {
                featuredMediaSlotsImgsSrcs.map((slot, index) => (
                  <div className = 'featured-media--slot' key = { index }>
                    <MediaSlot
                      size = 'normal'
                      { ...slot }
                    />
                  </div>
                ))
              }

              {
                featuredMediaSlotsImgsSrcs.map((slot, index) => (
                  <div className = 'featured-media--slot--mobile' key = { index }>
                    <MediaSlot
                      size = 'small'
                      { ...slot }
                    />
                  </div>
                ))
              }
            </section>

            { /* ---------------------------------------------------- */ }

            <section className = 'section-with--heading-and-content plotscore-lets-you'>
              <SectionHeading
                lang = { lang }
                namespace = 'LANDING_PAGE'
                section = 'PLOTSCORE_LETS_YOU'
                title = 'SECTION_TITLE'
              />

              <section className = 'section-content'>
                {[1, 2, 3].map(column => (
                  <article key = { `column-${ column }` } className = 'plotscore-lets-you--column'>
                    { [
                      { icon: IconEye, textKey: 'COLUMN_1_CARD_1' },
                      { icon: IconStarFilled, textKey: 'COLUMN_1_CARD_2' },
                      { icon: IconHeartFilled, textKey: 'COLUMN_2_CARD_1' },
                      { icon: IconCalendarMonth, textKey: 'COLUMN_2_CARD_2' },
                      { icon: IconAlignLeft, textKey: 'COLUMN_3_CARD_1' },
                      { icon: IconLayoutGridFilled, textKey: 'COLUMN_3_CARD_2' }
                    ].map((card, index) => (
                      column === Math.ceil((index + 1) / 2) && (
                        <PlotscoreLetsYouCard
                          key = { `card-${column}-${index}` }
                          column = { column }
                          icon = { card.icon }
                          text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', card.textKey) }
                        />
                      )
                    )) }
                  </article>
                )) }
              </section>
            </section>

            { /* ---------------------------------------------------- */ }

            <section className = 'section-with--heading-and-content just-reviewed'>
              <SectionHeading
                lang = { lang }
                namespace = 'LANDING_PAGE'
                section = 'JUST_REVIEWED'
                title = 'SECTION_TITLE'
                hasRightSideSingleText = 'MORE'
                hasDivider
              />

              <section className = 'section-content'>
                {
                  justReviewedSlotsImgsSrcs.map((slot, index) => (
                    <div className = 'just-reviewed--slot' key = { index }>
                      <MediaSlot
                        size = 'small'
                        { ...slot }
                      />
                    </div>
                  ))
                }
              </section>
            </section>

            {/* ---------------------------------------------------- */}

            <section className = 'encouraging-text'>
              <article className = 'encouraging-text--main'>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__FIRST_LINE') }
                </h3>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__SECOND_LINE') }
                </h3>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__THIRD_LINE') }
                </h3>
              </article>

              {/* ------------------------------- */}

              <article className = 'encouraging-text--main--mobile'>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__MOBILE__FIRST_LINE') }
                </h3>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__MOBILE__SECOND_LINE') }
                </h3>
                <h3>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'MAIN_TEXT__MOBILE__THIRD_LINE') }
                </h3>
              </article>

              {/* ------------------------------- */}

              <article className = 'encouraging-text--secondary'>
                <h5>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'SECONDARY_TEXT__FIRST_LINE') }
                </h5>
                <h5>
                  { translate(lang, 'LANDING_PAGE', 'ENCOURAGING_TEXT', 'SECONDARY_TEXT__SECOND_LINE') }
                </h5>
              </article>
            </section>

            {/* ---------------------------------------------------- */}

            <section className = 'popular-reviews--lists-reviewers'>
              <article className = 'section-with--heading-and-content popular-reviews'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'LANDING_PAGE'
                  section = 'POPULAR_REVIEWS'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = 'MORE'
                  hasDivider
                />

                <section className = 'section-content'>
                  { popularReviewsSlotsData.map((review, index) => [
                    <Review
                      key = { index }

                      lang = { lang }

                      hasPoster
                      { ...review }

                      type = 'horizontal-1'
                    />,
                    index !== popularReviewsSlotsData.length - 1 && <Divider key = { `divider-${ index }` } />
                  ]) }
                </section>
              </article>

              <section className = 'popular--lists-reviewers'>
                <article className = 'section-with--heading-and-content lists'>
                  <SectionHeading
                    lang = { lang }
                    namespace = 'LANDING_PAGE'
                    section = 'POPULAR_LISTS'
                    title = 'SECTION_TITLE'
                    hasRightSideSingleText = 'MORE'
                    hasDivider
                  />

                  <section className = 'section-content'>
                    { popularListsSlotsData.map((list, index) => [
                      <List
                        key = { index }

                        lang = { lang }

                        isInLandingPage = { true }

                        title = { list.title }

                        avatarLowResImgSrc = { list.avatarLowResImgSrc }
                        avatarHighResImgSrc = { list.avatarHighResImgSrc }
                        username = { list.username }

                        posters = { [
                          list.posters.poster1LowResSrc,
                          list.posters.poster1HighResSrc,

                          list.posters.poster2LowResSrc,
                          list.posters.poster2HighResSrc,

                          list.posters.poster3LowResSrc,
                          list.posters.poster3HighResSrc,

                          list.posters.poster4LowResSrc,
                          list.posters.poster4HighResSrc,

                          list.posters.poster5LowResSrc,
                          list.posters.poster5HighResSrc
                        ] }

                        likeCount = { list.likeCount }
                        commentCount = { list.commentCount }
                      />
                    ]) }
                  </section>
                </article>

                {/* ------------------------ */}

                <article className = 'section-with--heading-and-content reviewers'>
                  <SectionHeading
                    lang = { lang }
                    namespace = 'LANDING_PAGE'
                    section = 'POPULAR_REVIEWERS'
                    title = 'SECTION_TITLE'
                    hasRightSideSingleText = 'MORE'
                    hasDivider
                  />

                  <section className = 'section-content'>
                    { popularReviewersSlotsData.map((reviewer, index) => [
                      <PopularReviewer
                        key = { index }

                        lang = { lang }

                        { ...reviewer }
                      />,
                      index !== popularReviewersSlotsData.length - 1 && <Divider key = { `divider-${ index }` } />
                    ]) }
                  </section>
                </article>
              </section>
            </section>

            {/* ---------------------------------------------------- */}

            <section className = 'section-with--heading-and-content recent-stories'>
              <SectionHeading
                lang = { lang }
                namespace = 'LANDING_PAGE'
                section = 'RECENT_STORIES'
                title = 'SECTION_TITLE'
                hasRightSideSingleText = 'MORE'
                hasDivider
              />

              <section className = 'section-content'>
                <section className = 'recent-stories--column-1'>
                  { recentStoriesSlotsData.map((story, index) => (
                    story.column === 1 && (
                      <RecentStory
                        key = { index }

                        lang = { lang }

                        { ...story }
                      />
                    )
                  )) }
                </section>

                <section className = 'recent-stories--column-2'>
                  { recentStoriesSlotsData.map((story, index) => (
                    story.column === 2 && (
                      <RecentStory
                        key = { index }

                        lang = { lang }

                        { ...story }
                      />
                    )
                  )) }
                </section>

                <section className = 'recent-stories--column-3'>
                  { recentStoriesSlotsData.map((story, index) => (
                    story.column === 3 && (
                      <RecentStory
                        key = { index }

                        lang = { lang }

                        { ...story }
                      />
                    )
                  )) }
                </section>
              </section>

              {/* ------------------------------------- */}

              <section className = 'section-content--mobile'>
                { recentStoriesSlotsData.map((story, index) => (
                  <RecentStory
                    key = { index }

                    lang = { lang }

                    {...story }
                  />
                )) }
              </section>
            </section>

            
            {/* ---------------------------------------------------- */}

            <section className = 'section-with--heading-and-content recent-showdowns'>
              <SectionHeading
                lang = { lang }
                namespace = 'LANDING_PAGE'
                section = 'RECENT_SHOWDOWNS'
                title = 'SECTION_TITLE'
                hasRightSideSingleText = 'MORE'
                hasDivider
              />

              <section className = 'section-content'>
                { recentShowdownsSlotsData.map((showdown, index) => (
                  <RecentShowdownNews
                    className = { showdown.inProgress ? 'recent-showdown--in-progress' : '' }

                    key = { index }

                    lang = { lang }

                    { ...showdown }
                  />
                )) }
              </section>
            </section>

            {/* ---------------------------------------------------- */}

            <section className = 'section-with--heading-and-content recent-news'>
              <SectionHeading
                lang = { lang }
                namespace = 'LANDING_PAGE'
                section = 'RECENT_NEWS'
                title = 'SECTION_TITLE'
                hasRightSideSingleText = 'MORE'
                hasDivider
              />

              <section className = 'section-content'>
                { recentNewsSlotsData.map((news, index) => (
                  <RecentShowdownNews
                    key = { index }

                    { ...news }
                  />
                )) }
              </section>
            </section>
          </main>
        </section>
        <Footer lang = { lang } />
      </section>
    </>
  )
}
