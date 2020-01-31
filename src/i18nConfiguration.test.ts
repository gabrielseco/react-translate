import i18nConfiguration from './i18nConfiguration';

const commonEN = {
  'hello-world': 'hello world',
  'hello-world-with-interpolations': 'hello world my name is {{value}}',
  'hard-interpolation':
    'This is a fallback in case that <strong>the component</strong> does not load correctly',
  'hard-interpolation-with-props':
    'This is my count <strong>{{count}}</strong>',
  'pokemon': 'I have <strong>{{count}}</strong> pokemon',
  'pokemon_plural': 'I have <strong>{{count}}</strong> pokemones',
  'plural-singular': 'Only this singular translation'
};
const commonES = {
  'hello-world': 'hola mundo',
  'hello-world-with-interpolations': 'hola mundo mi nombre es {{value}}',
  'hard-interpolation':
    'Esto es un fallback en caso de que <strong>el componente</strong> no se cargue bien',
  'hard-interpolation-with-props': 'Mi cuenta es <strong>{{count}}</strong>',
  'pokemon': 'Tengo <strong>{{count}}</strong> pokemon',
  'pokemon_plural': 'Tengo <strong>{{count}}</strong> pokemones',
  'plural-singular': 'Singular traducción'
};

describe('i18nConfiguration', () => {
  const defaultConfig = {
    languages: ['es', 'en'],
    translations: {
      es: {
        common: commonES
      },
      en: {
        common: commonEN
      }
    },
    fallbackLng: 'en'
  };
  const i18next = i18nConfiguration(defaultConfig);

  it('should be defined i18Configuration as an instance', () => {
    expect(i18next.t).toBeDefined();
  });

  it('should translate content when passing language as config', () => {
    expect(i18next.t('common:hello-world')).toBe(commonEN['hello-world']);
  });

  it('should translate content when passing only the language as config', () => {
    const i18n = i18nConfiguration({
      ...defaultConfig,
      language: 'es'
    });

    expect(i18n.t('common:hello-world')).toBe(commonES['hello-world']);
  });
});
