import '/styles/components/common/side-menu.css'

export default function SideMenu({ lang }) {
  return (
    <div className = 'side-menu'>
      <section className = 'side-menu--user'></section>
      <section className = 'side-menu--main-actions'></section>
      <section className = 'side-menu--tabs'></section>
      <section className = 'side-menu--options'></section>
    </div>
  )
}
