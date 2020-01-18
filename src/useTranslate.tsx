import React from 'react';

import { isDev } from './utils';
import { TranslateContext } from './TranslateContext';

type Options = { [key: string]: any };

export type tFunction = (key: string, options?: Options) => string;

const isNil = (value: unknown): boolean => {
  return value === null || value === undefined;
};

const replaceBrackets = (
  translationValue: string,
  options?: Options
): string => {
  return translationValue.replace(/{{(.+?)}}/g, (_, g1) => {
    return options && !isNil(options) ? options[g1] : g1;
  });
};

const hasPlurals = (options: Options): boolean => {
  const arrValueOptions = Object.keys(options)
    .map(key => {
      return {
        type: typeof options[key],
        value: options[key]
      };
    })
    .filter(value => value.type === 'number' && value.value > 1);

  return arrValueOptions.length > 0;
};

const searchValueInMemory = ({
  jsonKey,
  searchSeparator,
  lang,
  namespace,
  translations
}: {
  jsonKey: string;
  searchSeparator: string;
  lang: string;
  namespace: string;
  translations: Record<string, any>;
}): string | undefined => {
  let translationValue: string;

  if (jsonKey.indexOf(searchSeparator) !== -1) {
    translationValue = jsonKey
      .split('.')
      .reduce((o, i) => o[i], translations[lang][namespace]);
  } else {
    translationValue = translations[lang][namespace][jsonKey];
  }

  return translationValue;
};

const useTranslate = (): { t: tFunction } => {
  const __DEV__ = isDev();
  const namespaceSeparator = ':';
  const searchSeparator = '.';
  const pluralsSuffix = '_plural';
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
    const hasNamespace = key.includes(namespaceSeparator);
    const optionsHasPlurals = options ? hasPlurals(options) : false;

    if (!hasNamespace) {
      if (__DEV__) {
        throw new Error(`${key} you passed should have a namespace`);
      }
      return '';
    }

    const [namespace, jsonKey] = key.split(namespaceSeparator);

    let translationValue: string | undefined;

    if (optionsHasPlurals) {
      const temporalPluralValue = searchValueInMemory({
        jsonKey: jsonKey + pluralsSuffix,
        namespace,
        translations,
        lang,
        searchSeparator
      });
      translationValue =
        temporalPluralValue !== undefined
          ? temporalPluralValue
          : searchValueInMemory({
              jsonKey,
              namespace,
              translations,
              lang,
              searchSeparator
            });
    } else {
      translationValue = searchValueInMemory({
        jsonKey,
        namespace,
        translations,
        lang,
        searchSeparator
      });
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
