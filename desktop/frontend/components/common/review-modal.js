import translate from '/src/app/translation.js'
import FormLabelInput from '/components/common/form--label-input.js'

import '/styles/components/common/review-modal.css'

export default function ReviewModal({ lang, closeReviewModal }) {
  const options = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5']

  return (
    <div className = 'review-modal'>
      <h2 className = 'review-modal__title'>
        {translate(lang, 'COMMON', 'REVIEW_MODAL', 'TITLE')}
      </h2>

      <form className = 'review-modal__form'>
        <div className = 'review-modal__form-group'>
          <FormLabelInput
            fieldType = 'select'

            label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'MEDIA_TITLE') }

            name = { null }
            id = { null }

            options = { options }
          />
        </div>
      </form>
    </div>
  )
}
