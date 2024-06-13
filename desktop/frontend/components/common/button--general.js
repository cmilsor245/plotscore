import '/styles/components/common/button--general.css'

export default function ButtonGeneral({
  type,
  className,
  text,
  onMouseEnter,
  onMouseLeave,
  onClick
}) {
  return (
    <button className = { `button--general ${ className }` } type = { type } onMouseEnter = { onMouseEnter } onMouseLeave = { onMouseLeave } onClick = { onClick }>
      { text }
    </button>
  )
}
