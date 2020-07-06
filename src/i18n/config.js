import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { Link, navigate, location } from "gatsby"
// import { initReactI18next } from "react-i18next"

/* const options = {
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

let lng = 'arm'

if (typeof window !== 'undefined') {
  const url = window.location.href;

  const pos = url.indexOf('lng=');

  const lng = url.substr(pos + 4);

  console.log('window.location', lng)
}



i18next
  .use(LanguageDetector)
  // .use(initReactI18next)
  .init({
    lng,
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
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    initialLanguage: lng,
    returnObjects: true,
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    react: {
      wait: false,
      useSuspense: true,
    },
  })

i18next.languages = ["ru", "en", "arm"]








 */



i18next.init({
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
  fallbackLng: 'arm',
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translations",
  react: {
    useSuspense: false,
  },
});



export default i18next
