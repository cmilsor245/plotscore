export const metadata = {
  title: 'plotscore',
  description: 'The plotscore project consists of a website based on reviews/ratings of all kinds of mainstream multimedia content, meaning content that can be consumed on major streaming platforms or in theaters or similar venues.',
}

export default function RootLayout({ children }) {
  return (
    <html lang = 'en'>
      <body>
        { children }
      </body>
    </html>
  )
}