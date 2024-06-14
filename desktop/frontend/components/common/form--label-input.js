import { useEffect, useState } from 'react'

import {
  IconEyeCheck,
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
  IconX
} from '@tabler/icons-react'

import translate from '/src/app/translation.js'

function Input(props) {
  return <input { ...props } />
}

/* ----------------------------- */

function Textarea(props) {
  return <textarea { ...props }></textarea>
}

/* ----------------------------- */

function Date(props) {
  return <input type = 'date' { ...props } />
}

/* ------------------------------ */

function WatchedOn(props) {
  return <input className = 'watched-on-input' type = 'date' { ...props } />
}

/* ----------------------------- */

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
        {...props }
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

/* ------------------------------ */

function Radio({ name, options, ...props }) {
  return (
    <div className = 'radio-group'>
      { options.map((option, index) => (
        <label key = { index }>
          <input
            type = 'radio'
            name = { name }
            value = { option }
            defaultChecked = { index === 0 }
            {...props }
          />
          { option }
        </label>
      )) }
    </div>
  )
}

/* ------------------------------ */

function BasicSelect({ id, ...props }) {
  const [options, setOptions] = useState([])
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${ apiUrl }/get-media-for-review`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setOptions(data)
        } else {
          console.log('failed to fetch options:', response.statusText)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchOptions()
  }, [])

  return (
    <div className = 'select-input'>
      <select id = { id } {...props }>
        { options.map((option, index) => (
          <option key = { index } value = { option }>
            { option.title } 
          </option>
        )) }
      </select>
    </div>
  )
}

/* ------------------------------ */

function SelectWithSearch({ id, value, onChange, ...props }) {
  const [options, setOptions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(`${ apiUrl }/get-media-for-review`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          
        if (response.ok) {
          const data = await response.json()
          setOptions(data)
        } else {
          console.log('failed to fetch options:', response.statusText)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchOptions()
  }, [])

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value
    onChange && onChange({ target: { value: selectedValue } })
  }

  return (
    <div className="select-input">
      <input
        disabled = { value !== '' }
        className = { `select__search-input ${ searchTerm && filteredOptions.length > 0 ? 'select__search-input--bordered' : '' }` }
        onChange = { handleSearchChange }
        autoFocus
      />
      <select
        disabled = { value !== '' }
        id = { id }
        className = { searchTerm && filteredOptions.length > 0 ? 'select__list--shown' : 'select__list' }
        value = { value }
        onChange = { handleSelectChange }
        { ...props } 
      >
        { filteredOptions.map((option, index) => (
          <option key = { index } value = { option.id }>
            { `${ option.title } - ${ option.release_date }` }
          </option>
        )) }
      </select>
    </div>
  )
}

/* ------------------------------ */

function Checkbox(props) {
  return <input type = 'checkbox' { ...props } />
}

/* ------------------------------ */

function Rating({ name, value = 0, onChange }) {
  const [rating, setRating] = useState(value)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (index, event) => {
    const { width, left } = event.target.getBoundingClientRect()
    const mouseX = event.clientX - left
    const isHalf = mouseX < width / 2
    const newRating = isHalf ? index - 0.5 : index
    setRating(newRating === rating ? 0 : newRating)
    onChange && onChange({ target: { value: newRating, name }})
  }

  const handleMouseOver = (index, event) => {
    const { width, left } = event.target.getBoundingClientRect()
    const mouseX = event.clientX - left
    const isHalf = mouseX < width / 2
    setHoverRating(isHalf ? index - 0.5 : index)
  }

  const handleMouseLeave = () => {
    setHoverRating(0)
  }

  const clearRating = () => {
    setRating(0)
    onChange && onChange({ target: { value: 0, name }})
  }

  const renderStar = (index) => {
    const filled = hoverRating >= index || (!hoverRating && rating >= index)
    const halfFilled = hoverRating === index - 0.5 || (!hoverRating && rating === index - 0.5)

    return (
      <span
        key = { index }
        onClick = { (e) => handleClick(index, e) }
        onMouseMove = { (e) => handleMouseOver(index, e) }
        onMouseLeave = { handleMouseLeave }
        className = { filled || halfFilled ? 'star-filled' : 'star-empty' }
      >
        { filled ? <IconStarFilled /> : halfFilled ? <IconStarHalfFilled /> : <IconStar /> }
      </span>
    )
  }

  return (
    <div className = 'rating'>
      { renderStar(1) }
      { renderStar(2) }
      { renderStar(3) }
      { renderStar(4) }
      { renderStar(5) }
      { rating > 0 && (
        <IconX className = 'clear-rating-button' onClick = { clearRating } stroke = { 1 } />
      ) }
    </div>
  )
}

/* ------------------------------ */

function Like({ name, value = false, onChange }) {
  const [liked, setLiked] = useState(value)

  const handleClick = () => {
    const newLiked = !liked
    setLiked(newLiked)
    onChange && onChange({ target: { value: newLiked, name }})
  }

  return (
    <span
      onClick = { handleClick }
      className = { liked ? 'like-filled' : 'like-empty' }
    >
      { liked ? <IconHeartFilled /> : <IconHeart /> }
    </span>
  )
}

/* ------------------------------ */

function Email(props) {
  return <input type = 'email' { ...props } />
}

/* ------------------------------ */

function Pronouns(props) {
  const [userSelectedPronoun, setUserSelectedPronoun] = useState('they/them')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchPronouns = async () => {
      try {
        const response = await fetch(`${ apiUrl }/user`, {
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setUserSelectedPronoun(data.pronouns)
        } else {
          console.error('failed to fetch pronouns:', response.statusText)
        }
      } catch (error) {
        console.error('error fetching pronouns:', error)
      }
    }

    fetchPronouns()
  }, [apiUrl])

  const handlePronounChange = (event) => {
    setUserSelectedPronoun(event.target.value)
  }

  const pronouns = [
    'he/him',
    'she/her',
    'they/them'
  ]

  return (
    <select value = { userSelectedPronoun } onChange = { handlePronounChange } { ...props }>
      { pronouns.map((pronoun) => (
        <option key = { pronoun } value = { pronoun }>
          { pronoun }
        </option>
      )) }
    </select>
  )
}

/* ------------------------------ */

function Posters(props) {
  const [postersConfiguration, setPostersConfiguration] = useState('any')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await fetch(`${ apiUrl }/user`, {
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setPostersConfiguration(data.posters_configuration)
        } else {
          console.error('failed to fetch posters:', response.statusText)
        }
      } catch (error) {
        console.error('error fetching posters:', error)
      }
    }

    fetchPosters()
  }, [apiUrl])

  const options = [
    'any',
    'only their',
    'only your',
    'no'
  ]

  const handlePostersChange = (event) => {
    setPostersConfiguration(event.target.value)
  }
  return (
    <select value = { postersConfiguration } onChange = { handlePostersChange } { ...props }>
      { options.map((option) => (
        <option key = { option } value = { option }>
          { option }
        </option>
      )) }
    </select>
  )
}

/* ------------------------------ */

function Replies(props) {
  const [repliesConfiguration, setRepliesConfiguration] = useState('any')
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(`${ apiUrl }/user`, {
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setRepliesConfiguration(data.replies_configuration)
        } else {
          console.error('failed to fetch replies:', response.statusText)
        }
      } catch (error) {
        console.error('error fetching replies:', error)
      }
    }

    fetchReplies()
  }, [apiUrl])

  const options = [
    'anyone',
    'friends',
    'you'
  ]

  const handleRepliesChange = (event) => {
    setRepliesConfiguration(event.target.value)
  }
  return (
    <select value = { repliesConfiguration } onChange = { handleRepliesChange } { ...props }>
      { options.map((option) => (
        <option key = { option } value = { option }>
          { option }
        </option>
      )) }
    </select>
  )
}

/* ------------------------------ */

function Search(props) {
  return <input type = 'search' { ...props } />
}

/* ------------------------------ */

export default function FormLabelInput({
  label,
  fieldType,
  id,
  options,
  ...props
}) {
  const renderInput = () => {
    switch (fieldType) {
      case 'textarea':
        return <Textarea id = { id } {...props } />
      case 'date':
        return <Date id = { id } {...props } />
      case 'watched-on':
        return <WatchedOn id = { id } {...props } />
      case 'file':
        return <File id = { id } {...props } />
      case 'radio':
        return <Radio id = { id } options = { options } {...props } />
      case 'media-for-review':
        // return <BasicSelect id = { id  } { ...props  } />
        return <SelectWithSearch id = { id } {...props } />
      case 'checkbox':
        return <Checkbox id = { id } {...props } />
      case 'rating':
        return <Rating {...props } />
      case 'like':
        return <Like id = { id } {...props } />
      case 'email':
        return <Email id = { id } {...props } />
      case 'pronouns':
        return <Pronouns id = { id } {...props } />
      case 'posters':
        return <Posters id = { id } {...props } />
      case 'replies':
        return <Replies id = { id } {...props } />
      case 'search':
        return <Search id = { id } {...props } />
      default:
        return <Input id = { id } {...props } />
    }
  }

  return (
    <>
      { fieldType !== 'checkbox' ? (
        <>
          <label htmlFor = { id }>
            <span dangerouslySetInnerHTML = {{ __html: label }}></span>
          </label>
          { renderInput() }
        </>
      ) : (
        <>
          { renderInput() }
          <label htmlFor = { id }>
            <span dangerouslySetInnerHTML = {{ __html: label }}></span>
          </label>
        </>
      ) }
    </>
  )
}
