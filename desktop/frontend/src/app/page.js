'use client'

import { useEffect, useState } from 'react'

import Home from '/src/app/home/page.js'
import LandingPage from '/src/app/landing-page/page.js'

export default function Index() {
  const [isLandingPage, setIsLandingPage] = useState(true)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    (
      async () => {
        try {
          // ! when there's no session cookie, it produces a 500 error
          const response = await fetch(`${ apiUrl }/user`, {
            credentials: 'include'
          })

          const content = await response.json()

          if (content.username) {
            setIsLandingPage(false)
            return
          }
        } catch (error) {
          setIsLandingPage(true)
          return
        }
      }
    )()
  })

  return isLandingPage ? <LandingPage /> : <Home />
}
