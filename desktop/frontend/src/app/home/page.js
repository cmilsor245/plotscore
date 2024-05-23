'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch(`${apiUrl}/user`, {
            credentials: 'include'
          })

          const content = await response.json()

          setMessage(`logged in as ${content.username}`)
        } catch (error) {
          setMessage('you\'re not logged in')
        }
      }
    )()
  })

  /* --------------------------- */

  const logout = async () => {
    await fetch(`${apiUrl}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    window.location.reload()
  }

  return (
    <>
      { message }

      <button onClick = { logout }>
        logout
      </button>
    </>
  )
}
