import Link from 'next/link'
import Image from 'next/image'

import '/styles/common/header.css'

import translate from '/src/app/translation'

export default function Header({ lang, handleLanguageChange }) {
  return (
    <header>
      <section className = 'header--logo'>
        <Link href = '/'>
          <Image className = 'header--logo-image' src = '/logo/logo.png' alt = 'plotscore logo' width={100} height={100} />
          <span className = 'header--logo-text'>plotscore</span>
        </Link>
      </section>

      <nav className = 'nav--links--search-bar'>
        <ul className = 'nav--links'>
          <li>{ translate(lang, 'LANDING_PAGE', 'NAV', 'SIGN_IN') }</li>
        </ul>
      </nav>
    </header>
  );
}

