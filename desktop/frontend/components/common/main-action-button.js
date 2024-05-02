export default function MainActionButton({ icon: Icon, handleClick }) {
  return (
    <>
      <button
        className = 'main-action-button'
        onClick = { handleClick }
      >
        <Icon className = 'main-action-button--icon' stroke = { 2 } />
      </button>
    </>
  )
}
