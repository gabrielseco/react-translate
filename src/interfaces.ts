export type Options = { [key: string]: any };
export type Translations = Record<string, any>;
export type tFunction = (key: string, options?: Options) => string;
export interface I18nConfiguration {
  fallbackLng: string;
  languages: string[];
  translations: Translations;
  language?: string;
}
