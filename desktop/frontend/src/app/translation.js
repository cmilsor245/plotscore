import translationsEN from './translations/en'
import translationsES from './translations/es'

const translate = (lang, namespace, section, key) => {
  switch (lang) {
    case 'en': 
      return translationsEN[namespace][section][key] || key
    case 'es': 
      return translationsES[namespace][section][key] || key
    default: 
      return key
  }
}

export default translate
