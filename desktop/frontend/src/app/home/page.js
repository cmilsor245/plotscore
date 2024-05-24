'use client'

import { useEffect, useState } from 'react'

import AdminDashboard from '/src/app/admin-dashboard/page.js'
import UserDashboard from '/src/app/user-dashboard/page.js'

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`${ apiUrl }/user`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUserData(data)
      }
    }

    fetchUserData()
  }, [apiUrl])

  /* --------------------------------------- */

  const logout = async () => {
    await fetch(`${ apiUrl }/logout`, {
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
      {
        userData && userData.role === 'admin' ?
          <AdminDashboard userData={userData} handleLogout={logout} />
        :
          <UserDashboard userData={userData} handleLogout={logout} />
      }
    </>
  )
}
