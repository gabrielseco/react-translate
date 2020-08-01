import { translate, getTraslationConstants } from './utils';
import { Options, tFunction, I18nConfiguration } from './interfaces';

export const i18nConfiguration = (
  config: I18nConfiguration
): { t: tFunction } => {
  const {
    isDev,
    searchSeparator,
    namespaceSeparator,
    pluralsSuffix
  } = getTraslationConstants();
  const { translations, language, fallbackLng } = config;
  const lang = language || fallbackLng;

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
