import '/styles/components/common/button--general.css'

export default function ButtonGeneral({
  type,
  className,
  text
}) {
  return (
    <button className = { `button--general ${ className }` } type = { type }>
      { text }
    </button>
  )
}
