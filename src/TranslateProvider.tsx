import React from 'react';

import { TranslateContext } from './TranslateContext';
import { I18nConfiguration } from './interfaces';

interface TranslateProviderProps {
  i18n: I18nConfiguration;
  children: React.ReactNode;
}

export const TranslateProvider = ({
  i18n,
  children
}: TranslateProviderProps): JSX.Element => {
  const [lang, setLang] = React.useState(i18n.language || i18n.fallbackLng);

  React.useEffect(() => {
    if (i18n.language) {
      setLang(i18n.language);
    }
  }, [i18n.language]);

  const switchLanguage = (language: string): void => {
    setLang(language);
  };

  const contextValue = {
    lang,
    languages: i18n.languages,
    translations: i18n.translations,
    switchLanguage
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      {children}
    </TranslateContext.Provider>
  );
};
