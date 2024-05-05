import '/styles/components/landing-page/plotscore-lets-you--card.css'

export default function PlotscoreLetsYouCard({ column, icon: Icon, text }) {
  let className

  switch (column) {
    case 1:
      className = 'plotscore-lets-you--card--column-1'
      break
    case 2:
      className = 'plotscore-lets-you--card--column-2'
      break
    case 3:
      className = 'plotscore-lets-you--card--column-3'
      break
    default:
      className = 'plotscore-lets-you--card--column-1'
  }

  className += ' plotscore-lets-you--card'

  return (
    <div className = { className }>
      <Icon className = 'plotscore-lets-you--card--icon' />
      <p>{ text }</p>
    </div>
  )
}
