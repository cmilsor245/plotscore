import { useState } from 'react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/common/search-form.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

export default function SearchForm({ lang }) {
  const searchTermMinLength = 1
  const searchTermMaxLength = 255

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const submitSearch = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${ apiUrl }/get-user-and-or-media/${ searchTerm }`, {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className = 'review-modal'>
      <form className ='search-form__form' onSubmit = { submitSearch }>
        <div className = 'search-form__group'>
          <FormLabelInput
            type = 'search'

            className = 'search-form__input'

            placeholder = { translate(lang, 'COMMON', 'SEARCH_FORM', 'PLACEHOLDER') }

            minLength = { searchTermMinLength }
            maxLength = { searchTermMaxLength }

            name = 'searchTerm'
            id ='search-form--search-term'

            onChange = { handleSearchTermChange }
            value = { searchTerm }

            autoFocus
            required
            onFocus = { e => e.target.select() }
          />
          <CharacterCounter value = { searchTerm } maxLength = { searchTermMaxLength } />
        </div>

        <button type = 'submit' className = 'review-modal__submit'>
          { translate(lang, 'COMMON', 'SEARCH_FORM', 'SUBMIT_BUTTON') }
        </button>
      </form>
    </div>
  )
}
