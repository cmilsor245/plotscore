'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { IconCalendarMonth } from '@tabler/icons-react'

import Review from '/components/common/review.js'
import Divider from '/components/common/divider.js'
import MediaSlot from '/components/common/media-slot.js'
import SectionHeading from "/components/common/section-heading.js"
import favoriteMediaSlotsImgsSrcs from '/src/app/static-info/settings/favoriteMediaSlotsImgsSrcs.js'
import translate from '/src/app/translation.js'

import '/styles/components/user-profile/tabs/profile.css'

export default function ProfileTab({ lang }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [usernameInUrl, setUsernameInUrl] = useState('')
  const [isOwnProfilePage, setIsOwnProfilePage] = useState(false)

  const [ownUserData, setOwnUserData] = useState(null)
  const [totalOwnReviews, setTotalOwnReviews] = useState(0)
  const [fourLatestOwnReviews, setFourLatestOwnReviews] = useState([])
  const [fourLatestOwnReviewWithText, setFourLatestOwnReviewWithText] = useState([])

  const [otherUserData, setOtherUserData] = useState(null)
  const [totalOtherReviews, setTotalOtherReviews] = useState(0)
  const [fourLatestOtherReviews, setFourLatestOtherReviews] = useState([])
  const [fourLatestOtherReviewWithText, setFourLatestOtherReviewWithText] = useState([])

  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUsernameInUrl(window.location.pathname.split('/').pop())
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownUserResponse = await fetch(`${ apiUrl }/user`, { credentials: 'include' })
        const ownUserData = await ownUserResponse.json()
        setOwnUserData(ownUserData)

        const totalOwnReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ ownUserData.id }`, { credentials: 'include' })
        const totalOwnReviewsData = await totalOwnReviewsResponse.json()
        setTotalOwnReviews(totalOwnReviewsData.totalReviews)

        const sortedOwnReviews = totalOwnReviewsData.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setFourLatestOwnReviews(sortedOwnReviews.slice(0, 4))

        const validReviewsWithText = sortedOwnReviews.filter(review => review.review_text)
        setFourLatestOwnReviewWithText(validReviewsWithText.slice(0, 4))

        if (ownUserData.username === usernameInUrl) {
          setIsOwnProfilePage(true)
        } else {
          setIsOwnProfilePage(false)
          const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, { credentials: 'include' })
          const otherUserData = await otherUserResponse.json()
          setOtherUserData(otherUserData)

          const totalOtherReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ otherUserData.id }`, { credentials: 'include' })
          const totalOtherReviewsData = await totalOtherReviewsResponse.json()
          setTotalOtherReviews(totalOtherReviewsData.totalReviews)

          const sortedOtherReviews = totalOtherReviewsData.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          setFourLatestOtherReviews(sortedOtherReviews.slice(0, 4))

          const otherValidReviewsWithText = sortedOtherReviews.filter(review => review.review_text)
          setFourLatestOtherReviewWithText(otherValidReviewsWithText.slice(0, 4))
        }
      } catch (error) {
        setIsLoggedIn(false)
        setIsOwnProfilePage(false)

        const otherUserResponse = await fetch(`${ apiUrl }/get-user-by-username/${ usernameInUrl }`, { credentials: 'include' })
        const otherUserData = await otherUserResponse.json()
        setOtherUserData(otherUserData)

        const totalOtherReviewsResponse = await fetch(`${ apiUrl }/get-all-reviews-for-user/${ otherUserData.id }`, { credentials: 'include' })
        const totalOtherReviewsData = await totalOtherReviewsResponse.json()
        setTotalOtherReviews(totalOtherReviewsData.totalReviews)

        const sortedOtherReviews = totalOtherReviewsData.reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        setFourLatestOtherReviews(sortedOtherReviews.slice(0, 4))

        const otherValidReviewsWithText = sortedOtherReviews.filter(review => review.review_text)
        setFourLatestOtherReviewWithText(otherValidReviewsWithText.slice(0, 4))
      }
    }

    if (usernameInUrl) {
      fetchData()
    }
  }, [usernameInUrl, apiUrl])

  const convertToSlug = (text) => {
    if (typeof text !== 'string') return ''
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-')
  }

  const generateMediaSlug = (mediaTitle, mediaYear) => {
    if (!mediaTitle || !mediaYear) return ''
    const sluggedTitle = convertToSlug(mediaTitle)
    const mediaYearConverted = mediaYear.substring(0, 4)

    return `${ sluggedTitle }-${ mediaYearConverted }`
  }

  const staticTenLatestReviews = [
    { date: '05-04', title: 'Star Wars' },
    { date: '05-10', title: 'The Lord of the Rings: The Return of the King' },
    { date: '05-15', title: 'Inception' },
    { date: '05-20', title: 'The Dark Knight' },
    { date: '05-25', title: 'Forrest Gump' },
    { date: '05-30', title: 'The Matrix' },
    { date: '06-05', title: 'Pulp Fiction' },
    { date: '06-10', title: 'The Shawshank Redemption' },
    { date: '06-15', title: 'Fight Club' },
    { date: '06-20', title: 'The Godfather' }
  ]

  const posterSrc = 'https://image.tmdb.org/t/p/original/x5KZT5LYLvkCb3mxgOYXuPIuzs7.jpg'

  return (
    <section className = 'user-profile__tab'>
      <section className = 'left-side'>
        <section className = 'section__heading-and-content favorite-media'>
          <SectionHeading
            lang = { lang }
            namespace = 'PROFILE_TAB'
            section = 'FAVORITE_MEDIA'
            title = 'SECTION_TITLE'
            hasDivider
          />

          <section className = 'section-content'>
            { favoriteMediaSlotsImgsSrcs.map((imgSrc, index) => (
              <MediaSlot
                key = { index }
                size = 'normal'
                lowResImgSrc = { imgSrc.lowResImgSrc }
                highResImgSrc = { imgSrc.highResImgSrc }
              />
            )) }
          </section>
        </section>

        {/* -------------------------------------------- */}

        <section className = 'section__heading-and-content recent-activity'>
          <SectionHeading
            lang = { lang }
            namespace = 'PROFILE_TAB'
            section = 'RECENT_ACTIVITY'
            title = 'SECTION_TITLE'
            hasRightSideSingleText = { translate(lang, 'PROFILE_TAB', 'RECENT_ACTIVITY', 'MORE') }
            hasDivider
          />

          <section className = 'section-content'>
            { isOwnProfilePage ? (
              fourLatestOwnReviews.length < 4 ? (
                <>
                  { fourLatestOwnReviews.map((review, index) => {
                    return (
                      <Link href = { `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }` } key = { index }>
                        <MediaSlot
                          size = 'normal'
                          lowResImgSrc = { posterSrc }
                          highResImgSrc = { posterSrc }
                          hasLogInfo
                          rating = { review.rating }
                          hasWatchedBefore = { review.watched_before === 0 ? true : false }
                          hasReviewText = { review.review_text ? true : false }
                        />
                      </Link>
                    )
                  }) }
                  { fourLatestOwnReviews.length < 4 && [...Array(4 - fourLatestOwnReviews.length)].map((_, index) => (
                    <div className = 'media-slot__placeholder normal' key = { index }></div>
                  )) }
                </>
              ) : (
                fourLatestOwnReviews.map((review, index) => {
                  return (
                    <Link href = { `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }` } key = { index }>
                      <MediaSlot
                        size = 'normal'
                        lowResImgSrc = { posterSrc }
                        highResImgSrc = { posterSrc }
                        hasLogInfo
                        rating = { review.rating }
                        hasWatchedBefore = { review.watched_before === 0 ? true : false }
                        hasReviewText = { review.review_text ? true : false }
                      />
                    </Link>
                  )
                })
              )
            ) : (
              fourLatestOtherReviews.length < 4 ? (
                <>
                  { fourLatestOtherReviews.map((review, index) => {
                    return (
                      <Link href = { `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }` } key = { index }>
                        <MediaSlot
                          size = 'normal'
                          lowResImgSrc = { posterSrc }
                          highResImgSrc = { posterSrc }
                          hasLogInfo
                          rating = { review.rating }
                          hasWatchedBefore = { review.watched_before === 0 ? true : false }
                          hasReviewText = { review.review_text ? true : false }
                        />
                      </Link>
                    )
                  }) }
                  { fourLatestOtherReviews.length < 4 && [...Array(4 - fourLatestOtherReviews.length)].map((_, index) => (
                    <div className = 'media-slot__placeholder normal' key = { index }></div>
                  )) }
                </>
              ) : (
                fourLatestOtherReviews.map((review, index) => {
                  return (
                    <Link href = { `/media/${ generateMediaSlug(review.media_title, review.media_release_date) }` } key = { index }>
                      <MediaSlot
                        size = 'normal'
                        lowResImgSrc = { posterSrc }
                        highResImgSrc = { posterSrc }
                        hasLogInfo
                        rating = { review.rating }
                        hasWatchedBefore = { review.watched_before === 0 ? true : false }
                        hasReviewText = { review.review_text ? true : false }
                      />
                    </Link>
                  )
                })
              )
            ) }
          </section>
        </section>

        {/* -------------------------------------------- */}

        <section className = 'section__heading-and-content recent-reviews'>
          <SectionHeading
            lang = { lang }
            namespace = 'PROFILE_TAB'
            section = 'RECENT_REVIEWS'
            title = 'SECTION_TITLE'
            hasRightSideSingleText = { translate(lang, 'PROFILE_TAB', 'RECENT_REVIEWS', 'MORE') }
            hasDivider
          />

          <section className = 'section-content'>
            { isOwnProfilePage ? (
              <>
                { fourLatestOwnReviewWithText.map((review, index) => {
                  <Review
                    key = { index }

                    lang = { lang }

                    hasPoster
                    { ...review }

                    type = 'horizontal-2'
                  />,
                  index !== fourLatestOwnReviewWithText.length - 1 && <Divider />
                }) }
              </>
            ) : (
              <>
                
              </>
            ) }
          </section>
        </section>
      </section>

      <section className = 'right-side'>
        <section className = 'section__heading-and-content diary'>
          <SectionHeading
            lang = { lang }
            namespace = 'PROFILE_TAB'
            section = 'DIARY'
            title = 'SECTION_TITLE'
            hasRightSideSingleText = { isOwnProfilePage  ? (totalOwnReviews || '0') : (totalOtherReviews || '0') }
            hasDivider
          />

          <section className = 'section-content'>
            <div className = 'left-column'>
              <IconCalendarMonth />
            </div>
            <div className = 'right-column'>
              { staticTenLatestReviews.map((review, index) => (
                <React.Fragment key = { index }>
                  <p>
                    <span>{ review.date }</span>
                    <span>{ review.title }</span>
                  </p>
                  { index !== staticTenLatestReviews.length - 1 && <Divider /> }
                </React.Fragment>
              )) }
            </div>
          </section>
        </section>
      </section>
    </section>
  )
}
