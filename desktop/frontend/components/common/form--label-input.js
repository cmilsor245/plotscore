import { useState } from 'react'

import { IconEyeCheck } from '@tabler/icons-react'

import translate from '/src/app/translation.js'

function Input(props) {
  return <input { ...props } />
}

function Textarea(props) {
  return <textarea { ...props }></textarea>
}

function Date(props) {
  return <input type = 'date' { ...props } />
}

function File({ onChange, ...props }) {
  const [errorModalDisplayed, setErrorModalDisplayed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      const maxSize = 4096 * 1024

      if (!validTypes.includes(file.type)) {
        setErrorMessage(translate(props.lang, 'NEW_MEDIA_PAGE', 'FORM', 'POSTER_ERROR_TEXT_1'))
        setErrorModalDisplayed(true)
        event.target.value = null
        return
      }

      if (file.size > maxSize) {
        setErrorMessage(translate(props.lang, 'NEW_MEDIA_PAGE', 'FORM', 'POSTER_ERROR_TEXT_2'))
        setErrorModalDisplayed(true)
        event.target.value = null
        return
      }

      onChange && onChange(event)
    }
  }

  const handleNotificationClose = () => {
    setErrorModalDisplayed(false)
  }

  return (
    <>
      <input
        type = 'file'
        accept = '.jpeg,.png,.jpg,.webp'
        onChange = { handleFileChange }
        { ...props }
      />

      <div className = { `error-modal error-modal--login ${ errorModalDisplayed ? 'error-modal--displayed' : '' }` }>
        <p>{ errorMessage }</p>
        <button className = 'error-modal__close-button' onClick = { handleNotificationClose }>
        <IconEyeCheck />
        </button>
      </div>
    </>
  )
}


function Radio({ name, options, ...props }) {
  return (
    <div className = 'radio-group'>
      {
        options.map((option, index) => (
          <label key = { index }>
            <input
              type = 'radio'
              name = { name }
              value = { option }
              defaultChecked = { index === 0 }
              { ...props }
            />
            { option }
          </label>
        ))
      }
    </div>
  )
}

export default function FormLabelInput({ label, fieldType, id, ...props }) {
  const renderInput = () => {
    switch (fieldType) {
      case 'textarea':
        return <Textarea id = { id } { ...props } />
      case 'date':
        return <Date id = { id } { ...props } />
      case 'file':
        return <File id = { id } { ...props } />
      case 'radio':
        return <Radio id = { id } { ...props } />
      default:
        return <Input id = { id } { ...props } />
    }
  }

  return (
    <>
      <label htmlFor = { id }>
        {label}
      </label>
      { renderInput() }
    </>
  )
}
