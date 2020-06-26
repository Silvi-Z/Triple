import i18next from 'i18next';

i18next.init({
    fallbackLng: 'en',
    resources: {
        'ru': {
            translations: require('../locales/ru/translation.json')
        },
        en: {
            translations: require('../locales/en/translation.json')
        }
    },
    ns: ['translations'],
    defaultNS: 'translations',
    returnObjects: true,
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    react: {
        wait: true,
    },
});

i18next.languages = ['ru', 'en'];

export default i18next