import { IconX } from '@tabler/icons-react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/review-modal.css'

export default function ReviewModal({ lang, closeReviewModal }) {
  return (
    <div className = 'review-modal'>
      <IconX onClick = { closeReviewModal } />

      <h2 className = 'review-modal__title'>
        { translate(lang, 'COMMON', 'REVIEW_MODAL', 'TITLE') }
      </h2>

      <form className = 'review-modal__form'>
        <div className = 'review-modal__form-group'>
          <FormLabelInput
            fieldType = 'select'

            label = { translate(lang, 'COMMON', 'REVIEW_MODAL', 'MEDIA_TITLE') }

            name = { null }
            id = { null }
          />
        </div>
      </form>
    </div>
  )
}
