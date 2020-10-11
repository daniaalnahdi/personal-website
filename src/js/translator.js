import en from '../translations/en.json';
import ar from '../translations/ar.json';

export const Translator = (() => {
  const elements = document.querySelectorAll('[data-translate]');
  const languagesData = new Map([
    ['en', en],
    ['ar', ar],
  ]);
  let selectedLanguage;

  // Sets default language based on params or user history
  const setDefaultLanguage = () => {
    const queryParams = new URLSearchParams(window.location.search);
    //1. Check query params OR 2. Check last-stored language
    let languageCode = queryParams.has('lang')
      ? queryParams.get('lang')
      : window.localStorage.getItem('language');

    //3. Get browser language
    if (!languageCode) {
      const browserLanguage = navigator.languages
        ? navigator.languages[0]
        : navigator.language;

      languageCode = browserLanguage.substring(0, 2);
    }

    try {
      selectedLanguage = {
        code: languageCode,
        data: languagesData.get(languageCode),
      };
    } catch {
      // Default to English if language not found
      selectedLanguage = { code: 'en', data: languagesData.get('en') };
    }

    setLanguageParams();
  };

  const setLanguageParams = () => {
    const queryParams = new URLSearchParams(window.location.search);

    queryParams.set('lang', selectedLanguage.code);
    history.replaceState(null, null, '?' + queryParams.toString());
  };

  // Changes the HTML language tag
  const setLanguageTag = () => {
    document.documentElement.lang = selectedLanguage.code;
  };

  // Loops through selected language data and renders text
  const translate = () => {
    const body = document.querySelector('body');
    const rtl = selectedLanguage.code == 'ar';

    if (rtl) {
      body.classList.add('rtl');
      body.classList.remove('ltr');
    } else {
      body.classList.add('ltr');
      body.classList.remove('rtl');
    }

    elements.forEach((element) => {
      const keys = element.dataset.translate.split('-');
      const text = keys.reduce(
        (accumulator, i) => accumulator[i],
        selectedLanguage.data
      );

      if (text) {
        const textNode = document.createElement('SPAN');
        textNode.innerHTML = text;
        element.prepend(textNode);

        // Change direction of English text in Arabic to left-to-right if specified
        // if (rtl && !!element.lang && element.lang == 'en') {
        //   element.classList.add('ltr');
        // }
      }
    });
  };

  // Clears current translations
  const clearTranslations = () => {
    elements.forEach((element) => {
      element.removeChild(element.firstChild);
    });
  };

  // Updates translations based on given language code
  const changeLanguage = (languageCode) => {
    selectedLanguage = {
      code: languageCode,
      data: languagesData.get(languageCode),
    };

    window.localStorage.setItem('language', languageCode); // Saves user's preference

    clearTranslations();
    setLanguageParams();
    setLanguageTag();
    translate();
  };

  const init = () => {
    setDefaultLanguage();
    setLanguageTag();
    translate();
  };

  return {
    changeLanguage,
    init,
  };
})();
