import { useEffect, useState } from 'react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/review-modal.css'

export default function ReviewModal({ lang, closeReviewModal }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // ! not working
  // const [options, setOptions] = useState([])

  // useEffect(() => {
  //   const fetchOptions = async () => {
  //     try {
  //       const response = await fetch(`${ apiUrl }/get-media-for-review`, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })

  //       if (response.ok) {
  //         const data = await response.json()
  //         setOptions(data)
  //       } else {
  //         throw new Error('failed to fetch options')
  //       }
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   fetchOptions()
  // }, [])

  return (
    <div className = 'review-modal'>
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

            // options = { options }
          />
        </div>
      </form>
    </div>
  )
}
