import '/styles/components/landing-page/plotscore-lets-you--card.css'

export default function PlotscoreLetsYouCard({ column, icon: Icon, text }) {
  let className

  switch (column) {
    case 1:
      className = 'plotscore-lets-you__column-1'
      break
    case 2:
      className = 'plotscore-lets-you__column-2'
      break
    case 3:
      className = 'plotscore-lets-you__column-3'
      break
    default:
      className = 'plotscore-lets-you__column-1'
  }

  className += ' plotscore-lets-you__card'

  return (
    <div className = { className }>
      <Icon className = 'plotscore-lets-you__icon' />
      <p>{ text }</p>
    </div>
  )
}
