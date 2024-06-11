import '/styles/components/common/button--general.css'

export default function ButtonGeneral({
  text
}) {
  return (
    <button className = 'button--general'>
      { text }
    </button>
  )
}
