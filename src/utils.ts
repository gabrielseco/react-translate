import { Options, Translations } from './interfaces';

export const isDev = (): boolean => process.env.NODE_ENV === 'development';

const hasPlurals = (options: Options): boolean => {
  const arrValueOptions = Object.keys(options)
    .map(key => {
      return {
        type: typeof options[key],
        value: options[key]
      };
    })
    .filter(
      value => value.type === 'number' && (value.value > 1 || value.value === 0)
    );

  return arrValueOptions.length > 0;
};

const checkNamespaceInTranslations = ({
  translations,
  lang,
  namespace
}: {
  namespace: string;
  translations: Record<string, any>;
  lang: string;
}) => {
  return Boolean(translations[lang][namespace]);
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

  const foundSeparator = jsonKey.indexOf(searchSeparator) !== -1;

  if (checkNamespaceInTranslations({ translations, lang, namespace })) {
    if (foundSeparator) {
      translationValue = jsonKey
        .split('.')
        .reduce((o, i) => o[i], translations[lang][namespace]);
    } else {
      translationValue = translations[lang][namespace][jsonKey];
    }
  } else {
    throw new Error(
      `Namespace ${namespace} not found please add it to your i18n config`
    );
  }

  return translationValue;
};

const replaceBrackets = (
  translationValue: string,
  options?: Options
): string => {
  return translationValue.replace(/{{(.+?)}}/g, (_, g1) => {
    return options ? options[g1] : g1;
  });
};

export const getTraslationConstants = () => {
  const __DEV__ = isDev();
  const namespaceSeparator = ':';
  const searchSeparator = '.';
  const pluralsSuffix = '_plural';

  return {
    isDev: __DEV__,
    namespaceSeparator,
    searchSeparator,
    pluralsSuffix
  };
};

export const translate = ({
  key,
  options,
  translations,
  lang,
  constants
}: {
  key: string;
  options?: Options;
  translations: Translations;
  lang: string;
  constants: {
    isDev: boolean;
    namespaceSeparator: string;
    searchSeparator: string;
    pluralsSuffix: string;
  };
}): string => {
  const {
    isDev,
    namespaceSeparator,
    searchSeparator,
    pluralsSuffix
  } = constants;
  const hasNamespace = key.includes(namespaceSeparator);
  const optionsHasPlurals = options ? hasPlurals(options) : false;

  if (!hasNamespace) {
    if (isDev) {
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
    if (isDev) {
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
