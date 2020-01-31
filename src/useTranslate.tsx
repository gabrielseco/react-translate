import React from 'react';

import { translate, getTraslationConstants } from './utils';
import { TranslateContext } from './TranslateContext';
import { Options, tFunction } from './interfaces';

const useTranslate = (): { t: tFunction } => {
  const {
    isDev,
    searchSeparator,
    namespaceSeparator,
    pluralsSuffix
  } = getTraslationConstants();
  const context = React.useContext(TranslateContext);

  if (context === null) {
    console.error('Context is not defined, you should define it');
    return {
      t: (key: string, options?: Options): string => {
        return '';
      }
    };
  }

  const { translations, lang } = context;

  const t = (key: string, options?: Options): string => {
    return translate({
      key,
      options,
      translations,
      lang,
      constants: {
        isDev,
        namespaceSeparator,
        searchSeparator,
        pluralsSuffix
      }
    });
  };

  return {
    t
  };
};

export default useTranslate;
