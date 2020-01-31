import { translate, getTraslationConstants } from './utils';
import { Options, tFunction } from './interfaces';

const i18nConfiguration = (config): { t: tFunction } => {
  const {
    isDev,
    searchSeparator,
    namespaceSeparator,
    pluralsSuffix
  } = getTraslationConstants();
  const { translations, lang } = config;
  return {
    t: (key: string, options?: Options): string => {
      return translate({
        key,
        options,
        translations,
        lang,
        constants: { isDev, searchSeparator, namespaceSeparator, pluralsSuffix }
      });
    }
  };
};

export default i18nConfiguration;
