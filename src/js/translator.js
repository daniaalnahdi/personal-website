import en from '../translations/en.json';
import ar from '../translations/ar.json';

export const Translator = (() => {
  const elements = document.querySelectorAll('[data-translate]');
  const languagesData = new Map([
    ['en', en],
    ['ar', ar],
  ]);
  let selectedLanguage;

  // Sets default language based on user history
  const setDefaultLanguage = () => {
    // Get last-stored language
    let languageCode = window.localStorage.getItem('language');

    //If no language stored, get browser language
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
  };

  // Changes the HTML language tag
  const setLanguageTag = () => {
    document.documentElement.lang = selectedLanguage.code;
  };

  // Loops through selected language data and renders text
  const translate = () => {
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

        // Change direction to right-to-left for Arabic
        if (
          selectedLanguage.code == 'ar' &&
          !element.lang &&
          element.lang !== 'en'
        ) {
          element.classList.add('rtl');
        } else {
          //Reset direction
          element.classList.remove('rtl');
        }
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
