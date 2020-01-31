import React from 'react';

import { Translations } from './interfaces';

export interface TranslateContextInterface {
  lang: string;
  translations: Translations;
  switchLanguage: (language: string) => void;
}

export const TranslateContext = React.createContext<TranslateContextInterface | null>(
  null
);
