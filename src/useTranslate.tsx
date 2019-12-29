import React from 'react';
import warning from 'warning';

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
    const [namespace, jsonKey] = key.split(':');
    let translationValue: string;

    if (jsonKey.indexOf('.') !== -1) {
      translationValue = jsonKey
        .split('.')
        .reduce((o, i) => o[i], translations[lang][namespace]);
    } else {
      translationValue = translations[lang][namespace][jsonKey];
    }

    warning(
      translationValue !== undefined,
      `The value you provided ${key} doesn't exists please check the ${namespace} file so you make sure it exists`
    );

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
