import '/styles/components/common/side-menu.css'

export default function SideMenu({
  lang,

  userData,

  handleLogout
}) {
  return (
    <div className = 'side-menu'>
      <section className = 'side-menu--user'>
        <p>{ userData ? userData.username : "\u00A0" }</p>
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
