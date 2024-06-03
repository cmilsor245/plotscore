async function loadComponents(
  path,
  component
) {
  try {
    const response = await fetch(path)
    const html = await response.text()

    document.querySelector(component).innerHTML = html
  } catch (error) {
    console.error(error)
  }
}

window.onload = async function() {
  // await loadComponents(
  //   '../components/control-panel.html',
  //   '.control-panel'
  // )
}
