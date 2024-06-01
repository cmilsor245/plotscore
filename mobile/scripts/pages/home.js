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
  await loadComponents('../components/new-releases/component.html', '.new-releases--media-slots')
  await loadComponents('../components/dive-back-in/component.html', '.dive-back-in--media-slots')
  await loadComponents('../components/popular-in-plotscore/component.html', '.popular-in-plotscore--media-slots')
}
