import '/styles/global.css'

export const metadata = {
  title: 'plotscore',
  description: 'The plotscore project consists of a website based on reviews/ratings of all kinds of mainstream multimedia content, meaning content that can be consumed on major streaming platforms or in theaters or similar venues.'
}

export default function AdminLayout({ children }) {
  return (
    <html lang = 'en'>
      <head>
        <title>{ metadata.title }</title>
        <link rel = 'icon' href = '/favicon.ico' />
        <meta name = 'description' content = { metadata.description } />
        <meta name = 'viewport' content = 'width = device-width, initial-scale = 1' />
        <meta charSet = 'utf-8' />
      </head>
      <body>
        { children }
      </body>
    </html>
  )
}
