import React from 'react';

import { TranslateContext } from './TranslateContext';
import { Configuration } from './interfaces';

interface TranslateProviderProps {
  value: Configuration;
  children: React.ReactNode;
}

const TranslateProvider = ({
  value,
  children
}: TranslateProviderProps): JSX.Element => {
  const [lang, setLang] = React.useState(value.language || value.fallbackLng);

  React.useEffect(() => {
    if (value.language) {
      setLang(value.language);
    }
  }, [value.language]);

  const switchLanguage = (language: string): void => {
    setLang(language);
  };

  const contextValue = {
    lang,
    languages: value.languages,
    translations: value.translations,
    switchLanguage
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
