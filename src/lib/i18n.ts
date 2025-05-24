import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import roTranslation from '@/locales/ro/translation.json';
import enTranslation from '@/locales/en/translation.json';
import deTranslation from '@/locales/de/translation.json';
import frTranslation from '@/locales/fr/translation.json';
import esTranslation from '@/locales/es/translation.json';
import itTranslation from '@/locales/it/translation.json';

const resources = {
  ro: {
    translation: roTranslation,
  },
  en: {
    translation: enTranslation,
  },
  de: {
    translation: deTranslation,
  },
  fr: {
    translation: frTranslation,
  },
  es: {
    translation: esTranslation,
  },
  it: {
    translation: itTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['ro', 'en'], // Multiple fallback languages
    lng: 'ro', // Default language
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    // Return empty string for missing keys instead of showing the key
    returnEmptyString: false,
    
    // Use the key as default value if translation is missing
    returnNull: false,
    
    // Fallback to key if translation is missing
    saveMissing: false,
  });

export default i18n; 