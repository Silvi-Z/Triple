import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"

const options = {
  // order and from where user language should be detected
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "sessionStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain",
  ],

  // keys or params to lookup language from
  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: "myDomain",
  preload: true,
  // optional htmlTag with lang attribute, the default is:
  //htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: "/" },
}

console.log('LanguageDetector', LanguageDetector)

i18next.use(LanguageDetector).init({
  // lng: 'ru',
  // fallbackLng: 'arm',
  resources: {
    ru: {
      translations: require("../locales/ru/translation.json"),
    },
    en: {
      translations: require("../locales/en/translation.json"),
    },
    arm: {
      translations: require("../locales/arm/translation.json"),
    },
  },
  detection: options,
  ns: ["translations"],
  defaultNS: "translations",
  returnObjects: true,
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
})

i18next.languages = ["ru", "en", "arm"]

export default i18next
