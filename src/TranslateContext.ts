import React from 'react';

export interface TranslateContextInterface {
  lang: string;
  translations: Record<string, any>;
  switchLanguage: (language: string) => void;
}

export const TranslateContext = React.createContext<TranslateContextInterface | null>(
  null
);
