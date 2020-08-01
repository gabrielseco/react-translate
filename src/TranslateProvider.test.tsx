import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  TranslateProvider,
  useTranslate,
  withTranslate,
  tFunction
} from './index';

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
const dashboardEN = {
  broncano: {
    say: {
      hi: 'Oh Mum'
    }
  }
};
const dashboardES = {
  broncano: {
    say: {
      hi: 'Oh Mama'
    }
  }
};

const Component = ({
  children,
  language
}: {
  children: any;
  language?: string;
}) => {
  const providerValue = {
    language: language,
    fallbackLng: 'en',
    languages: ['en', 'es'],
    translations: {
      en: {
        common: commonEN,
        dashboard: dashboardEN
      },
      es: {
        common: commonES,
        dashboard: dashboardES
      }
    }
  };
  return <TranslateProvider i18n={providerValue}>{children}</TranslateProvider>;
};

const TranslationExample = ({
  literal,
  options
}: {
  literal: string;
  options?: any;
}) => {
  const { t } = useTranslate();
  return <p>{t(literal, options)}</p>;
};

describe('TranslationProvider', () => {
  it('should update the language prop if we pass a different language to the provider', () => {
    const ProviderUpdate = ({ children }: { children: any }) => {
      const [language, setLanguage] = React.useState('en');
      const providerValue = {
        language: language,
        fallbackLng: 'en',
        languages: ['en', 'es'],
        translations: {
          en: {
            common: commonEN,
            dashboard: dashboardEN
          },
          es: {
            common: commonES,
            dashboard: dashboardES
          }
        }
      };
      return (
        <>
          <TranslateProvider i18n={providerValue}>{children}</TranslateProvider>
          <button onClick={() => setLanguage('es')}></button>
        </>
      );
    };
    const Child = () => {
      const { lang } = useTranslate();
      return <p>{lang}</p>;
    };

    const { container, getByRole } = render(
      <ProviderUpdate>
        <Child></Child>
      </ProviderUpdate>
    );

    expect(container.querySelector('p')).toHaveTextContent('en');
    const button = getByRole('button');

    fireEvent.click(button);
    expect(container.querySelector('p')).toHaveTextContent('es');
  });
});

describe('useTranslate', () => {
  it('should return an error if the provider is not setted', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    const Child = () => {
      const { t, switchLanguage } = useTranslate();
      React.useEffect(() => {
        switchLanguage('en');
      }, [switchLanguage]);
      return <p>{t('common:hello-world')}</p>;
    };

    render(<Child />);

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(
      'Context is not defined, you should define it'
    );
    console.error = originalConsoleError;
  });
  it('should return the literal expected', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample literal="common:hello-world"></TranslationExample>
      </Component>
    );

    const p = container.querySelector('p');

    expect(p).toHaveTextContent(commonEN['hello-world']);
  });

  it('should return the a literal with interpolations', () => {
    const { getByText } = render(
      <Component language="en">
        <TranslationExample
          literal="common:hello-world-with-interpolations"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
      </Component>
    );

    expect(getByText(/Gabriel/)).toBeDefined();
  });

  it('should return the a literal with dot notation', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample literal="dashboard:broncano.say.hi"></TranslationExample>
      </Component>
    );

    expect(container.querySelector('p')).toHaveTextContent(
      dashboardEN.broncano.say.hi
    );
  });

  it('should return the literal in english and after in spanish', () => {
    const ChangeLanguage = () => {
      const { switchLanguage } = useTranslate();
      return <button onClick={() => switchLanguage('es')}>change lang</button>;
    };
    const { container, getByRole } = render(
      <Component language="en">
        <TranslationExample
          literal="common:hello-world"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
        <ChangeLanguage />
      </Component>
    );

    const p = container.querySelector('p');
    const button = getByRole('button');

    expect(p).toHaveTextContent(commonEN['hello-world']);

    fireEvent.click(button);

    expect(p).toHaveTextContent(commonES['hello-world']);
  });

  it('should return the translate value without interpolations', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample literal="common:hello-world-with-interpolations"></TranslationExample>
      </Component>
    );

    const p = container.querySelector('p');

    expect(p?.textContent).toBe('hello world my name is value');
  });

  it('should return the plural translation with zero quantity', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample
          literal="common:pokemon"
          options={{ count: 0 }}
        ></TranslationExample>
      </Component>
    );
    expect(container.querySelector('p')).toHaveTextContent(
      'I have <strong>0</strong> pokemones'
    );
  });

  it('should return the plural translation if it finds one', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample
          literal="common:pokemon"
          options={{ count: 2 }}
        ></TranslationExample>
      </Component>
    );
    expect(container.querySelector('p')).toHaveTextContent(
      'I have <strong>2</strong> pokemones'
    );
  });

  it('should return the singular translation if it does not find the plural translation', () => {
    const { container } = render(
      <Component language="en">
        <TranslationExample
          literal="common:plural-singular"
          options={{ count: 2 }}
        ></TranslationExample>
      </Component>
    );
    expect(container.querySelector('p')).toHaveTextContent(
      'Only this singular translation'
    );
  });
  describe('errors', () => {
    beforeEach(() => {
      //eslint-disable-next-line
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as any).mockClear();
    });

    it("should return an empty string if we don't define a provider", () => {
      const { container } = render(
        <TranslationExample literal="common:hello-world"></TranslationExample>
      );
      const p = container.querySelector('p');

      expect(p).toHaveTextContent('');
      expect(console.error).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalledTimes(1);
    });

    it("should return an empty string if you don't put a namespace to it", () => {
      process.env.NODE_ENV = 'production';

      const { container } = render(
        <Component language="en">
          <TranslationExample literal="hi"></TranslationExample>
        </Component>
      );
      expect(container.querySelector('p')).toHaveTextContent('');
      process.env.NODE_ENV = '';
    });

    it("should return an empty string if we don't find the translation in development", () => {
      process.env.NODE_ENV = 'production';
      const { container } = render(
        <Component language="en">
          <TranslationExample literal="common:hi"></TranslationExample>
        </Component>
      );
      expect(container.querySelector('p')).toHaveTextContent('');

      process.env.NODE_ENV = '';
    });

    it("should return an error if you don't put a namespace to it", () => {
      process.env.NODE_ENV = 'development';
      const fn = () =>
        render(
          <Component language="en">
            <TranslationExample literal="hi"></TranslationExample>
          </Component>
        );
      expect(() => fn()).toThrow('hi you passed should have a namespace');

      process.env.NODE_ENV = 'production';
    });

    it("should not return an error if you don't put a namespace to it in production", () => {
      const fn = () =>
        render(
          <Component language="en">
            <TranslationExample literal="hi"></TranslationExample>
          </Component>
        );
      expect(() => fn()).not.toThrow('hi you passed should have a namespace');
    });

    it("should return an error if we don't find the translation in development", () => {
      process.env.NODE_ENV = 'development';
      const fn = () =>
        render(
          <Component language="en">
            <TranslationExample literal="common:hi"></TranslationExample>
          </Component>
        );

      expect(fn).toThrowError(
        "The value you provided common:hi doesn't exists please check the common file so you make sure it exists"
      );

      process.env.NODE_ENV = 'production';
    });

    it("should not return an error if we don't find the translation in production", () => {
      const fn = () =>
        render(
          <Component language="en">
            <TranslationExample literal="common:hi"></TranslationExample>
          </Component>
        );

      expect(fn).not.toThrowError(
        "The value you provided common:hi doesn't exists please check the common file so you make sure it exists"
      );
    });

    it("should return an error if the namespace doesn't exist", () => {
      process.env.NODE_ENV = 'development';
      const fn = () =>
        render(
          <Component language="en">
            <TranslationExample literal="auth:hi"></TranslationExample>
          </Component>
        );

      expect(fn).toThrowError(
        'Namespace auth not found please add it to your i18n config'
      );

      process.env.NODE_ENV = 'production';
    });
  });

  it("should not return an error if the namespace doesn't exist and it's production", () => {
    const fn = () =>
      render(
        <Component language="en">
          <TranslationExample literal="auth:hi.depp"></TranslationExample>
        </Component>
      );

    expect(fn).not.toThrowError(
      'Namespace auth not found please add it to your i18n config'
    );
  });

  it("should return an error if the translation is deep and doesn't exist", () => {
    process.env.NODE_ENV = 'development';
    const fn = () =>
      render(
        <Component language="en">
          <TranslationExample literal="common:hi.deep"></TranslationExample>
        </Component>
      );

    expect(fn).toThrowError(
      `The value you are searching for hi.deep does not exist in your locale common`
    );

    process.env.NODE_ENV = 'production';
  });

  it("should not return an error if the translation is deep and doesn't exist and we're in production", () => {
    const fn = () =>
      render(
        <Component language="en">
          <TranslationExample literal="common:hi.deep"></TranslationExample>
        </Component>
      );

    expect(fn).not.toThrowError(
      `The value you are searching for hi.deep does not exist in your locale common`
    );
  });
});

describe('withTranslate', () => {
  const TranslationExample = ({
    t,
    lang,
    languages
  }: {
    t: tFunction;
    lang: string;
    languages: string[];
  }) => {
    return (
      <>
        <h1>{lang}</h1>
        <p>{t('common:hello-world')}</p>
        {languages.map(language => {
          return <span key={language}>{language}</span>;
        })}
      </>
    );
  };

  const EnhancedTranslation = withTranslate(TranslationExample);

  it('should return the fallback setted in the provider', () => {
    const { container } = render(
      <Component>
        <EnhancedTranslation />
      </Component>
    );

    const p = container.querySelector('p');
    const h1 = container.querySelector('h1');

    expect(p).toHaveTextContent(commonEN['hello-world']);
    expect(h1).toHaveTextContent('en');
  });

  it('should return the languages', () => {
    const { container } = render(
      <Component>
        <EnhancedTranslation />
      </Component>
    );

    const languages = container.querySelectorAll('span');

    expect(languages.length).toBe(2);
    expect(languages[0]).toHaveTextContent('en');
    expect(languages[1]).toHaveTextContent('es');
  });

  it('should return a literal correctly', () => {
    const { container } = render(
      <Component language="en">
        <EnhancedTranslation />
      </Component>
    );

    const p = container.querySelector('p');

    expect(p).toHaveTextContent(commonEN['hello-world']);
  });
});
