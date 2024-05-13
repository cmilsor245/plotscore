export default function FormLabelInput({ label, ...props }) {
  return (
    <>
      <label htmlFor = { props.id }>
        { label }
      </label>

      <input
        type = { props.type }
        id = { props.id }
        name = { props.name }
        value = { props.value }
        onChange = { props.onChange }
        onFocus = { props.onFocus }
        autoFocus = { props.autoFocus }
        autoComplete = { props.autoComplete }
        placeholder = { props.placeholder }
        required = { props.required }
        minLength = { props.minLength }
        maxLength = { props.maxLength }
      />
    </>
  )
}
