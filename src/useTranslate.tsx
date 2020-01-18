import React from 'react';

import { isDev } from './utils';
import { TranslateContext } from './TranslateContext';

export type tFunction = (
  key: string,
  options?: { [key: string]: any }
) => string;

const isNil = (value: unknown): boolean => {
  return value === null || value === undefined;
};

const replaceBrackets = (
  translationValue: string,
  options?: { [key: string]: any }
): string => {
  return translationValue.replace(/{{(.+?)}}/g, (_, g1) => {
    return options && !isNil(options) ? options[g1] : g1;
  });
};

const useTranslate = (): { t: tFunction } => {
  const __DEV__ = isDev();
  const context = React.useContext(TranslateContext);

  if (context === null) {
    console.error('Context is not defined, you should define it');
    return {
      t: (key: string, options?: { [key: string]: any }): string => {
        return '';
      }
    };
  }

  const { translations, lang } = context;

  const t = (key: string, options?: { [key: string]: any }): string => {
    const namespaceSeparator = ':';
    const searchSeparator = '.';
    const hasNamespace = key.includes(namespaceSeparator);
    if (!hasNamespace) {
      if (__DEV__) {
        throw new Error(`${key} you passed should have a namespace`);
      }
      return '';
    }
    const [namespace, jsonKey] = key.split(namespaceSeparator);
    let translationValue: string;

    if (jsonKey.indexOf(searchSeparator) !== -1) {
      translationValue = jsonKey
        .split('.')
        .reduce((o, i) => o[i], translations[lang][namespace]);
    } else {
      translationValue = translations[lang][namespace][jsonKey];
    }

    if (translationValue === undefined) {
      if (__DEV__) {
        throw new Error(
          `The value you provided ${key} doesn't exists please check the ${namespace} file so you make sure it exists`
        );
      }
      return '';
    }

    const regex = new RegExp(/{{{?(#[a-z]+ )?[a-z]+.[a-z]*}?}}/);

    const parsedValue = regex.test(translationValue)
      ? replaceBrackets(translationValue, options)
      : translationValue;
    return parsedValue;
  };

  return {
    t
  };
};

export default useTranslate;
