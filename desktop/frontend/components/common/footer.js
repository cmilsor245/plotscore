import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandThreads,
  IconBrandTiktok,
  IconBrandX,
  IconBrandYoutube
} from '@tabler/icons-react'

import translate from '/src/app/translation.js'

import '/styles/components/common/footer.css'

export default function Footer({ lang }) {
  return (
    <footer>
      <section className = 'footer__top'>
        <article className = 'footer__main-links'>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'ABOUT') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'NEWS') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'PRO') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'APPS') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'PODCAST') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'YEAR_IN_REVIEW') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'GIFT_GUIDE') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'HELP') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'TERMS') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'API') }
          </h5>
          <h5>
            { translate(lang, 'COMMON', 'FOOTER', 'CONTACT') }
          </h5>
        </article>

        <article className = 'footer__socials'>
          <IconBrandX />
          <IconBrandThreads />
          <IconBrandFacebook />
          <IconBrandInstagram />
          <IconBrandTiktok />
          <IconBrandYoutube />
        </article>
      </section>

      {/* --------------------------------------------- */}

      <section className = 'footer__bottom'>
        <p>
          &copy; { translate(lang, 'COMMON', 'FOOTER', 'COPYRIGHT') }
        </p>
      </section>
    </footer>
  )
}
