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
      posterLowResImgSrc: '/img/landing-page/popular-reviews/1--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/1--high-res-poster.webp',

      mediaTitle: 'Ophelia',
      mediaYear: '2018',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/1--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/1--high-res-avatar.webp',

      username: 'irène',

      rating: 3,

      reviewText: 'daisy ridley serving flower lesbian aesthetics for almost 2 hours straight? sign me up',

      commentCount: 0,

      likeCount: 95,
    },
    {
      posterLowResImgSrc: '/img/landing-page/popular-reviews/2--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/2--high-res-poster.webp',

      mediaTitle: 'The Idea of You',
      mediaYear: '2024',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/2--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/2--high-res-avatar.webp',

      username: 'delaney🎞',

      rating: 2,

      reviewText: 'where\'s the emotion',

      commentCount: 0,

      likeCount: 13,
    },
    {
      posterLowResImgSrc: '/img/landing-page/popular-reviews/3--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/3--high-res-poster.webp',

      mediaTitle: 'Challengers',
      mediaYear: '2024',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/3--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/3--high-res-avatar.webp',

      username: 'George Carmi',

      rating: 2,

      reviewText: 'Been sitting on this one for a bit of time and I just can\'t come to terms with my feelings. I really want(ed) to like this given how highly rated it is among my mutuals and good friends. I found most of this to be really corny and predictable, which made for an experience devoid of any really tension and urgency. It fell miserably flat for me and none of the pieces came together to create something worthwhile. I rolled my eyes quite a bit and every time that booming techno score played I almost walked out of the theater. I just found a lot of this to be very annoying with really whiney characters and tennis sequences that made me cringe. This core throuple wasn\'t explored enough for me to care about their journey and where this film ends. As that final sequence was unfolding I could feel my skin crawl with secondhand embarrassment. Idk. I\'ll rewatch it eventually, but as it stands I really did not enjoy my time with this.',

      commentCount: 153,

      likeCount: 2000,
    },
    {
      posterLowResImgSrc: '/img/landing-page/popular-reviews/4--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/4--high-res-poster.webp',

      mediaTitle: 'Kingdom of the Planet of the Apes',
      mediaYear: '2024',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/4--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/4--high-res-avatar.webp',

      username: 'Albert',

      rating: 2,

      reviewText: 'En caliente estoy por decir que es mejor que las de la anterior trilogía.<br /><br />Also, Raka te quiero',

      commentCount: 3,

      likeCount: 17,
    },
    {
      posterLowResImgSrc: '/img/landing-page/popular-reviews/5--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/5--high-res-poster.webp',

      mediaTitle: 'X-Men \'97',
      mediaYear: '2024',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/5--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/5--high-res-avatar.webp',

      username: 'DJaquez',

      rating: 4.5,

      reviewText: 'If I had a nickle for every time disney brought back a previously cancelled show and made it great again, I\'d have 2 nickles, which isn\'t a lot but it\'s weird that it happened twice',

      commentCount: 4,

      likeCount: 28,
    },
    {
      posterLowResImgSrc: '/img/landing-page/popular-reviews/6--low-res-poster.webp',
      posterHighResImgSrc: '/img/landing-page/popular-reviews/6--high-res-poster.webp',

      mediaTitle: 'Young Sheldon',
      mediaYear: '2017',

      avatarLowResImgSrc: '/img/landing-page/popular-reviews/6--low-res-avatar.webp',
      avatarHighResImgSrc: '/img/landing-page/popular-reviews/6--high-res-avatar.webp',

      username: 'verystrnge',

      rating: 5,

      reviewText: 'peak fiction 🍷🗿',

      commentCount: 1,

      likeCount: 39,
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
                  { popularReviewsSlotsData.map((review, index) => [
                    <Review
                      lang = { lang }

                      hasPoster
                      posterLowResImgSrc = { review.posterLowResImgSrc }
                      posterHighResImgSrc = { review.posterHighResImgSrc }

                      mediaTitle = { review.mediaTitle }
                      mediaYear = { review.mediaYear }

                      avatarLowResImgSrc = { review.avatarLowResImgSrc }
                      avatarHighResImgSrc = { review.avatarHighResImgSrc }
                      username = { review.username }

                      rating = { review.rating }

                      reviewText = { review.reviewText }

                      commentCount = { review.commentCount }
                      likeCount = { review.likeCount }

                      type = 'horizontal-1'
                    />,
                    index !== popularReviewsSlotsData.length - 1 && <Divider key = { `divider-${ index }` } />
                  ]) }
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
