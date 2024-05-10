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

import Footer from '/components/common/footer.js'
import {
  CircleFlagsEs,
  CircleFlagsUk,
  MainActionButton
} from '/components/common/main-action-button.js'
import MediaSlot from '/components/common/media-slot.js'
import Review from '/components/common/review.js'
import SectionHeading from '/components/common/section-heading.js'
import Backdrop from '/components/landing-page--specific-media/backdrop.js'
import {
  MaterialSymbolsAndroidDarkTheme,
  MaterialSymbolsAndroidLightTheme,
  MdiAppleDarkTheme,
  MdiAppleLightTheme
} from '/components/landing-page/also-available.js'
import PlotscoreLetsYouCard from '/components/landing-page/plotscore-lets-you--card.js'
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

  /* ----------------------------------------------------------- */

  const featuredMediaSlotsImgsSrcs = [
    {
      lowResImgSrc: '/img/landing-page/featured-media/1--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/1--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/featured-media/2--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/2--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/featured-media/3--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/3--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/featured-media/4--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/4--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/featured-media/5--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/5--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/featured-media/6--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/featured-media/6--high-res-poster.webp'
    }
  ]

  /* ----------------------------------------------------------- */

  const justReviewedSlotsImgsSrcs = [
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/1--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/1--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/2--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/2--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/3--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/3--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/4--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/4--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/5--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/5--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/6--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/6--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/7--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/7--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/8--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/8--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/9--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/9--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/10--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/10--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/11--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/11--high-res-poster.webp'
    },
    {
      lowResImgSrc: '/img/landing-page/just-reviewed/12--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/just-reviewed/12--high-res-poster.webp'
    }
  ]

  /* ----------------------------------------------------------- */

  const popularReviewsSlotsData = [
    {
      lowResImgSrc: '/img/landing-page/popular-reviews/1--low-res-poster.webp',
      highResImgSrc: '/img/landing-page/popular-reviews/1--high-res-poster.webp',

      mediaTitle: 'The Last Of Us',
      mediaYear: '2023',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/1--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/1--high-res-avatar.webp',

      username: 'jordi-wild',

      rating: 4.5,

      reviewText: 'pedro pascal as a lonely dad adopting a child you will always be famous',

      commentCount: 13,

      likeCount: 31,
    }
  ]

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

      <section className = 'common--content-footer'>
        <section className = 'common--content-footer--content'>
          <Backdrop
            lowResImgSrc = '/img/landing-page--specific-media/low-res-backdrop.webp'
            highResImgSrc = '/img/landing-page--specific-media/high-res-backdrop.webp'
            hasHeader
            isInLandingPage
            lang = { lang }
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

              <button className = 'usp--get-started-button'>
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
                featuredMediaSlotsImgsSrcs.map((imgSrcs, index) => (
                  <div className = 'featured-media--slot' key = { index }>
                    <MediaSlot
                      size = 'normal'
                      lowResImgSrc = { imgSrcs.lowResImgSrc }
                      highResImgSrc = { imgSrcs.highResImgSrc }
                    />
                  </div>
                ))
              }

              {
                featuredMediaSlotsImgsSrcs.map((imgSrcs, index) => (
                  <div className = 'featured-media--slot--mobile' key = { index }>
                    <MediaSlot
                      size = 'small'
                      lowResImgSrc = { imgSrcs.lowResImgSrc }
                      highResImgSrc = { imgSrcs.highResImgSrc }
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
                <article className = 'plotscore-lets-you--column'>
                  <PlotscoreLetsYouCard
                    column = { 1 }
                    icon = { IconEye }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_1_CARD_1') }
                  />
                  <PlotscoreLetsYouCard
                    column = { 1 }
                    icon = { IconStarFilled }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_1_CARD_2') }
                  />
                </article>
                <article className = 'plotscore-lets-you--column'>
                  <PlotscoreLetsYouCard
                    column = { 2 }
                    icon = { IconHeartFilled }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_2_CARD_1') }
                  />
                  <PlotscoreLetsYouCard
                    column = { 2 }
                    icon = { IconCalendarMonth }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_2_CARD_2') }
                  />
                </article>
                <article className = 'plotscore-lets-you--column'>
                  <PlotscoreLetsYouCard
                    column = { 3 }
                    icon = { IconAlignLeft }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_3_CARD_1') }
                  />
                  <PlotscoreLetsYouCard
                    column = { 3 }
                    icon = { IconLayoutGridFilled }
                    text = { translate(lang, 'LANDING_PAGE', 'PLOTSCORE_LETS_YOU', 'COLUMN_3_CARD_2') }
                  />
                </article>
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
                  justReviewedSlotsImgsSrcs.map((imgSrcs, index) => (
                    <div className = 'just-reviewed--slot' key = { index }>
                      <MediaSlot
                        size = 'small'
                        lowResImgSrc = { imgSrcs.lowResImgSrc }
                        highResImgSrc = { imgSrcs.highResImgSrc }
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

            <section className = 'popular-reviews--lists'>
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
                  {/* <Review
                    lang = { lang }

                    hasPoster
                    posterLowResImgSrc = { popularReviewsSlotsData[0].lowResPosterSrc }
                    posterHighResImgSrc = { popularReviewsSlotsData[0].highResPosterSrc }

                    mediaTitle = { popularReviewsSlotsData[0].mediaTitle }
                    mediaYear = { popularReviewsSlotsData[0].mediaYear }

                    hasAvatar
                    avatarLowResImgSrc = { popularReviewsSlotsData[0].lowResAvatarSrc }
                    avatarHighResImgSrc = { popularReviewsSlotsData[0].highResAvatarSrc }
                    hasUsername
                    username = { popularReviewsSlotsData[0].username }

                    rating = { popularReviewsSlotsData[0].rating }

                    hasText
                    reviewText = { popularReviewsSlotsData[0].reviewText }

                    hasCommentCount
                    commentCount = { popularReviewsSlotsData[0].commentCount }

                    hasLikeCount
                    likeCount = { popularReviewsSlotsData[0].likeCount }

                    type = 'horizontal-1'
                  /> */}

                  <Review
                    lang = { lang }

                    avatarLowResImgSrc = { popularReviewsSlotsData[0].lowResAvatarSrc }
                    avatarHighResImgSrc = { popularReviewsSlotsData[0].highResAvatarSrc }
                    username = { popularReviewsSlotsData[0].username }

                    rating = { popularReviewsSlotsData[0].rating }

                    hasText
                    reviewText = { popularReviewsSlotsData[0].reviewText }

                    hasCommentCount
                    commentCount = { popularReviewsSlotsData[0].commentCount }

                    likeCount = { popularReviewsSlotsData[0].likeCount }
                  />
                </section>
              </article>

              <article className = 'section-with--heading-and-content lists'>
                <SectionHeading
                  lang = { lang }
                  namespace = 'LANDING_PAGE'
                  section = 'POPULAR_LISTS'
                  title = 'SECTION_TITLE'
                  hasRightSideSingleText = 'MORE'
                  hasDivider
                />
              </article>
            </section>
          </main>
        </section>

        { /* -------------------------------------------- */ }

        <Footer lang = { lang } />
      </section>
    </>
  )
}
