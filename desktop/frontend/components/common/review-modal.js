import { useEffect, useState } from 'react'

import { IconX } from '@tabler/icons-react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/review-modal.css'

export default function ReviewModal({
  lang,

  userData,

  closeReviewModal,
  handleReviewCreatedNotification
}) {
  const [isSelectAltered, setIsSelectAltered] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const [watchedOn, setWatchedOn] = useState('')
  const [watchedBefore, setWatchedBefore] = useState(false)

  const [rating, setRating] = useState(0)
  const [like, setLike] = useState(false)

  const [reviewText, setReviewText] = useState('')
  const [containsSpoilers, setContainsSpoilers] = useState(false)

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value)
    setIsSelectAltered(true)
  }

  const handleRatingChange = (e) => {
    setRating(e.target.value)
  }

  const handleLikeChange = (e) => {
    setLike(e.target.value)
  }

  const handleWatchedOnChange = (e) => {
    setWatchedOn(e.target.value)
  }

  const handleWatchedBeforeChange = (e) => {
    setWatchedBefore(e.target.checked)
  }

  const handleReviewTextChange = (e) => {
    setReviewText(e.target.value)
  }

  const handleContainsSpoilersChange = (e) => {
    setContainsSpoilers(e.target.checked)
  }

  /* ----------------------------------------------- */

  const currentPath = window.location.pathname

  const [mediaSelected, setMediaSelected] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${ apiUrl }/media/${ selectedOption }`, {
        credentials: 'include'
      })

      const data = await response.json()
      setMediaSelected(data)
    }

    if (selectedOption) {
      fetchData()
    }
  })

  /* ----------------------------------------------- */

  const submit = async (e) => {
    e.preventDefault()

    const userID = userData.id
    const userUsername = userData.username
    const userAvatar = userData.avatar

    const bodyData = {
      user_id: userID,
      user_username: userUsername,
      user_avatar: userAvatar,

      media_id: selectedOption,
      media_title: mediaSelected.title,
      media_release_date: mediaSelected.release_date,
      media_poster: mediaSelected.poster,

      watched_on: watchedOn,
      watched_before: watchedBefore,

      rating: rating,
      liked_media: like,

      review_text: reviewText,
      contains_spoilers: containsSpoilers
    }

    try {
      await fetch(`${ apiUrl }/create-review`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      })

      handleReviewCreatedNotification(mediaSelected.title, mediaSelected.release_date);

      // if (currentPath.startsWith(`/user/${ userUsername }`)) {
      //   setTimeout(() => {
      //     window.location.reload();
      //   }, 3000);
      // }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className = 'review-modal'>
      <IconX className = 'review-modal__close' onClick = { closeReviewModal } />
      <h2 className = 'review-modal__title'>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'TITLE') }
      </h2>
      <form className = 'review-modal__form' onSubmit = { submit }>
        <div className = 'review-modal__form-group'>
          <FormLabelInput
            fieldType = 'media-for-review'

            label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'MEDIA_TITLE') }

            name = 'media_id'
            id = 'review-modal--media-title'
            required

            onChange = { handleSelectChange }
            value = { selectedOption }
          />
        </div>

        { isSelectAltered && (
          <>
            <div className = 'review-modal__form-group watched-inputs'>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'watched-on'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'WATCHED_ON') }

                  name = 'watched_on'
                  id = 'review-modal__watched-on'
                  required

                  onChange = { handleWatchedOnChange }
                  value = { watchedOn }
                />
              </div>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'checkbox'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'WATCHED_BEFORE') }

                  name = 'watched_before'
                  id = 'review-modal--watched-before'

                  onChange = { handleWatchedBeforeChange }
                  value = { watchedBefore }
                />
              </div>
            </div>

            {/* ------------------------------------ */}

            <div className = 'review-modal__form-group text-and-spoilers'>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'textarea'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_TEXT') }

                  name = 'review_text'
                  id = 'review-modal--text'

                  onChange = { handleReviewTextChange }
                  value = { reviewText }
                />
              </div>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'checkbox'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'CONTAINS_SPOILERS') }

                  name = 'contains_spoilers'
                  id = 'review-modal--spoilers-free'

                  onChange = { handleContainsSpoilersChange }
                  value = { containsSpoilers }
                />
              </div>
            </div>

            {/* ------------------------------------ */}

            <div className = 'review-modal__form-group rating-and-like'>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'rating'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'RATING') }

                  name = 'rating'
                  id = 'review-modal__rating'

                  onChange = { handleRatingChange }
                  value = { rating }
                />
              </div>
              <div className = 'review-modal__form-group like'>
                <FormLabelInput
                  fieldType = 'like'

                  name = 'liked_media'
                  id = 'review-modal--like'

                  onChange = { handleLikeChange }
                  value = { like }
                />
              </div>
            </div>

            <button type = 'submit' className = 'review-modal__submit'>
              { translate(lang, 'COMMON', 'REVIEW_MODAL', 'SUBMIT_BUTTON') }
            </button>
          </>
        ) }
      </form>
    </div>
  )
}
