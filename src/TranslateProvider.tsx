import React from 'react';

import { TranslateContext } from './TranslateContext';

interface TranslateProviderProps {
  value: {
    fallbackLng: string;
    languages: string[];
    translations: Record<string, any>;
    language?: string;
  };
  children: React.ReactNode;
}

const TranslateProvider = ({
  value,
  children
}: TranslateProviderProps): JSX.Element => {
  const lang = value.language || value.fallbackLng;
  const [context, setContext] = React.useState({
    lang,
    languages: value.languages,
    translations: value.translations
  });

  const switchLanguage = (language: string): void => {
    setContext(contextState => ({
      ...contextState,
      lang: language
    }));
  };

  const contextValue = {
    ...context,
    switchLanguage
  };

  return (
    <TranslateContext.Provider value={contextValue}>
      {children}
    </TranslateContext.Provider>
  );
};

export default TranslateProvider;
