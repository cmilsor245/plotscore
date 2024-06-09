import { useState } from 'react'

import { IconX } from '@tabler/icons-react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/review-modal.css'

export default function ReviewModal({ lang, closeReviewModal }) {
  const [isSelectAltered, setIsSelectAltered] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [rating, setRating] = useState(0)
  const [like, setLike] = useState(false)

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

  return (
    <div className = 'review-modal'>
      <IconX className = 'review-modal__close' onClick = { closeReviewModal } />
      <h2 className = 'review-modal__title'>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'TITLE') }
      </h2>
      <form className = 'review-modal__form'>
        <div className = 'review-modal__form-group'>
          <FormLabelInput
            fieldType = 'select'
            label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'MEDIA_TITLE') }
            name = 'review-modal--media-title'
            id = 'review-modal--media-title'
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

                  name = 'review-modal--watched-on'
                  id = 'review-modal__watched-on'
                />
              </div>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'checkbox'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'WATCHED_BEFORE') }

                  name = 'review-modal--watched-before'
                  id = 'review-modal--watched-before'
                />
              </div>
            </div>

            {/* ------------------------------------ */}

            <div className = 'review-modal__form-group text-and-spoilers'>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'textarea'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'REVIEW_TEXT') }

                  name = 'review-modal--text'
                  id = 'review-modal--text'
                />
              </div>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'checkbox'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'SPOILERS_FREE') }

                  name = 'review-modal--spoilers-free'
                  id = 'review-modal--spoilers-free'
                />
              </div>
            </div>

            {/* ------------------------------------ */}

            <div className = 'review-modal__form-group rating-and-like'>
              <div className = 'review-modal__form-group'>
                <FormLabelInput
                  fieldType = 'rating'

                  label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'RATING') }

                  name = 'review-modal--rating'
                  id = 'review-modal__rating'

                  onChange = { handleRatingChange }
                  value = { rating }
                />
              </div>
              <div className = 'review-modal__form-group like'>
                <FormLabelInput
                  fieldType = 'like'

                  name = 'review-modal--like'
                  id = 'review-modal--like'

                  onChange = { handleLikeChange }
                  value = { like }
                />
              </div>
            </div>
          </>
        ) }
      </form>
    </div>
  )
}
