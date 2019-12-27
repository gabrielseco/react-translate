import React from 'react';
import Mustache from 'mustache';
import warning from 'warning';

import { TranslateContext } from './TranslateContext';

const useTranslate = (...args: string[]) => {
  const context = React.useContext(TranslateContext);

  if (context === null) {
    console.error('Context is not defined, you should define it');
    return;
  }

  const { translations, lang } = context;

  const t = (key: string, options?: { [key: string]: any }): string => {
    const [namespace, jsonKey] = key.split(':');
    let translationValue: string = translations[lang][namespace][jsonKey];

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
      ? Mustache.render(translationValue, options)
      : translationValue;
    return parsedValue;
  };

  return {
    t
  };
};

export default useTranslate;
