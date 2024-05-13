import { useEffect, useState } from 'react'

import { IconX } from '@tabler/icons-react'

import FormLabelInput from '/components/common/form--label-input.js'
import translate from '/src/app/translation.js'

import '/styles/components/landing-page/account-form.css'

function CharacterCounter({ value, maxLength }) {
  const remainingChars = maxLength - value.length
  return (
    <div className = 'character-counter'>
      { remainingChars } / { maxLength }
    </div>
  )
}

function SignUpForm({ lang }) {
  const handleHideAccountForm = () => {
    document.querySelector('.account-form.login').classList.add('hidden')

    document.querySelector('.account-form.signup').classList.add('hidden')

    document.querySelector('.account-form--overlay').classList.add('hidden')
  }

  /* ---------------------- */

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  /* ---------------------- */

  const signUpEmailMinLength = 7
  const signUpEmailMaxLength = 255

  const signUpUsernameMinLength = 4
  const signUpUsernameMaxLength = 50

  const signUpPasswordMinLength = 8
  const signUpPasswordMaxLength = 255

  return (
    <div className = 'account-form signup hidden'>
      <div className = 'account-form--close-button' onClick = { handleHideAccountForm }>
        <IconX />
      </div>

      <h2
        className = 'account-form--title'
        dangerouslySetInnerHTML = {{
          __html: translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'SIGN_UP_TITLE'),
        }}
      ></h2>

      <form className = 'signup-form' method = 'post'>
        <div className = 'account-form--group'>
          <FormLabelInput
            label = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'EMAIL') }

            minLength = { signUpEmailMinLength }
            maxLength = { signUpEmailMaxLength }

            name = 'account-form--email-address'
            id = 'account-form--signup--email-address'

            onChange = { handleEmailChange }
            onFocus = { e => e.target.select() }
            autoFocus
            required
            type = 'email'
            value = { email }
            placeholder = 'example@example.com'
          />
          <CharacterCounter value = { email } maxLength = { signUpEmailMaxLength } />
        </div>

        <div className = 'account-form--group'>
          <FormLabelInput
            label = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'USERNAME') }

            minLength = { signUpUsernameMinLength }
            maxLength = { signUpUsernameMaxLength }

            name = 'account-form--username'
            id = 'account-form--signup--username'

            onChange = { handleUsernameChange }
            onFocus = { e => e.target.select() }
            required
            type = 'text'
            value = { username }
            placeholder = 'username13'
          />
          <CharacterCounter value = { username } maxLength = { signUpUsernameMaxLength } />
        </div>

        <div className = 'account-form--group'>
          <FormLabelInput
            label = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'PASSWORD') }

            minLength = { signUpPasswordMinLength }
            maxLength = { signUpPasswordMaxLength }

            name = 'account-form--password'
            id = 'account-form--signup--password'

            onChange = { handlePasswordChange }
            onFocus = { e => e.target.select() }
            required
            type = 'password'
            value = { password }
            placeholder = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'PASSWORD_PLACEHOLDER') }
          />
          <CharacterCounter value = { password } maxLength = { signUpPasswordMaxLength } />
        </div>

        <input
          className = 'account-form--submit'
          type = 'submit'
          value = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'SIGN_UP_BUTTON') }
        />
      </form>
    </div>
  )
}

function LoginForm({ lang }) {
  const handleHideAccountForm = () => {
    document.querySelector('.account-form.login').classList.add('hidden')

    document.querySelector('.account-form.signup').classList.add('hidden')

    document.querySelector('.account-form--overlay').classList.add('hidden')
  }

  /* ---------------------- */

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  /* ---------------------- */

  const loginEmailMinLength = 7
  const loginEmailMaxLength = 255

  const loginPasswordMinLength = 8
  const loginPasswordMaxLength = 255

  return (
    <div className = 'account-form login hidden'>
      <div className = 'account-form--close-button' onClick = { handleHideAccountForm }>
        <IconX />
      </div>

      <h2
        className = 'account-form--title'
        dangerouslySetInnerHTML = {{
          __html: translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'LOG_IN_TITLE'),
        }}
      ></h2>

      <form className = 'login-form' method = 'post'>
        <div className = 'account-form--group'>
          <FormLabelInput
            label = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'EMAIL') }

            minLength = { loginEmailMinLength }
            maxLength = { loginEmailMaxLength }

            name = 'account-form--email-address'
            id = 'account-form--login--email-address'

            onChange = { handleEmailChange }
            onFocus = { e => e.target.select() }
            autoFocus
            required
            type = 'email'
            value = { email }
          />
          <CharacterCounter value = { email } maxLength = { loginEmailMaxLength } />
        </div>
        <div className = 'account-form--group'>
          <FormLabelInput
            label = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'PASSWORD') }

            minLength = { loginPasswordMinLength }
            maxLength = { loginPasswordMaxLength }

            name = 'account-form--password'
            id = 'account-form--login--password'

            onChange = { handlePasswordChange }
            onFocus = { e => e.target.select() }
            required
            type = 'password'
            value = { password }
          />
          <CharacterCounter value = { password } maxLength = { loginPasswordMaxLength } />
        </div>
        <input
          className = 'account-form--submit'
          type = 'submit'
          value = { translate(lang, 'LANDING_PAGE', 'ACCOUNT_FORM', 'LOG_IN_BUTTON') }
        />
      </form>
    </div>
  )
}

export default function AccountForm({ lang, type }) {
  let conditionalForm

  switch (type) {
    case 'signup':
      conditionalForm = <SignUpForm lang = { lang } />
      break
    case 'login':
      conditionalForm = <LoginForm lang = { lang } />
      break
  }

  return <>{ conditionalForm }</>
}
