import Image from 'next/image'

import '/styles/components/common/side-menu.css'

export default function SideMenu({
  lang,
  userData,
  handleLogout
}) {
  const publicApiStoragePath = process.env.NEXT_PUBLIC_API_STORAGE_PATH

  const defaultAvatarSrc = `${ publicApiStoragePath }avatars/default.png`

  const avatarSrc = userData && userData.avatar
    ? userData.avatar
    : defaultAvatarSrc

  return (
    <div className = 'side-menu'>
      <section className = 'side-menu--user'>
        <Image
          src = { avatarSrc }
          width = { 100 }
          height = { 100 }
          alt = 'avatar'
        />
      </section>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--main-actions'></section>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--tabs'></section>

      {/* -------------------------------------------------------------- */}

      <section className = 'side-menu--options'>
        <button onClick = { handleLogout }>logout</button>
      </section>
    </div>
  )
}
