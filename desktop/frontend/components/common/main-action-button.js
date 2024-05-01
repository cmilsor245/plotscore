export default function MainActionButton({ icon: Icon, handleClick }) {
  return (
    <>
      <button onClick = { handleClick }>
        <Icon stroke = { 2 } />
      </button>
    </>
  );
}
