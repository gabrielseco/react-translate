import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

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
        <React.Fragment>
          <TranslateProvider i18n={providerValue}>{children}</TranslateProvider>
          <button onClick={() => setLanguage('es')}></button>
        </React.Fragment>
      );
    };
    const Child = () => {
      const { lang } = useTranslate();
      return <p>{lang}</p>;
    };

    render(
      <ProviderUpdate>
        <Child></Child>
      </ProviderUpdate>
    );

    expect(screen.getByText('en')).toBeInTheDocument();

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(screen.getByText('es')).toBeInTheDocument();
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
    render(
      <Component language="en">
        <TranslationExample literal="common:hello-world"></TranslationExample>
      </Component>
    );

    expect(screen.getByText(commonEN['hello-world'])).toBeInTheDocument();
  });

  it('should return the a literal with interpolations', () => {
    render(
      <Component language="en">
        <TranslationExample
          literal="common:hello-world-with-interpolations"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
      </Component>
    );

    expect(screen.getByText(/Gabriel/)).toBeInTheDocument();
  });

  it('should return the a literal with dot notation', () => {
    render(
      <Component language="en">
        <TranslationExample literal="dashboard:broncano.say.hi"></TranslationExample>
      </Component>
    );

    expect(screen.getByText(dashboardEN.broncano.say.hi)).toBeInTheDocument();
  });

  it('should return the literal in english and after in spanish', () => {
    const ChangeLanguage = () => {
      const { switchLanguage } = useTranslate();
      return <button onClick={() => switchLanguage('es')}>change lang</button>;
    };

    render(
      <Component language="en">
        <TranslationExample
          literal="common:hello-world"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
        <ChangeLanguage />
      </Component>
    );

    const button = screen.getByRole('button');

    expect(screen.getByText(commonEN['hello-world'])).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText(commonES['hello-world'])).toBeInTheDocument();
  });

  it('should return the translate value without interpolations', () => {
    render(
      <Component language="en">
        <TranslationExample literal="common:hello-world-with-interpolations"></TranslationExample>
      </Component>
    );

    expect(
      screen.getByText('hello world my name is value')
    ).toBeInTheDocument();
  });

  it('should return the plural translation with zero quantity', () => {
    render(
      <Component language="en">
        <TranslationExample
          literal="common:pokemon"
          options={{ count: 0 }}
        ></TranslationExample>
      </Component>
    );
    expect(
      screen.getByText('I have <strong>0</strong> pokemones')
    ).toBeInTheDocument();
  });

  it('should return the plural translation if it finds one', () => {
    render(
      <Component language="en">
        <TranslationExample
          literal="common:pokemon"
          options={{ count: 2 }}
        ></TranslationExample>
      </Component>
    );

    expect(
      screen.getByText('I have <strong>2</strong> pokemones')
    ).toBeInTheDocument();
  });

  it('should return the singular translation if it does not find the plural translation', () => {
    render(
      <Component language="en">
        <TranslationExample
          literal="common:plural-singular"
          options={{ count: 2 }}
        ></TranslationExample>
      </Component>
    );
    expect(
      screen.getByText('Only this singular translation')
    ).toBeInTheDocument();
  });
  describe('errors', () => {
    beforeEach(() => {
      // eslint-disable-next-line
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as any).mockClear();
    });

    it("should return an empty string if we don't define a provider", () => {
      render(
        <TranslationExample literal="common:hello-world"></TranslationExample>
      );

      expect(screen.queryByText(commonEN['hello-world'])).toBe(null);
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
      <React.Fragment>
        <h1>lang: {lang}</h1>
        <p>{t('common:hello-world')}</p>
        {languages.map((language) => {
          return <span key={language}>{language}</span>;
        })}
      </React.Fragment>
    );
  };

  const EnhancedTranslation = withTranslate(TranslationExample);

  it('should return the fallback setted in the provider', () => {
    render(
      <Component>
        <EnhancedTranslation />
      </Component>
    );

    expect(screen.getByText(/lang: en/)).toBeInTheDocument();
  });

  it('should return the languages', () => {
    const { container } = render(
      <Component>
        <EnhancedTranslation />
      </Component>
    );

    const languages = container.querySelectorAll('span');

    expect(languages.length).toBe(2);
    expect(screen.getByText('en')).toBeInTheDocument();
    expect(screen.getByText('es')).toBeInTheDocument();
  });

  it('should return a literal correctly', () => {
    render(
      <Component language="en">
        <EnhancedTranslation />
      </Component>
    );

    expect(screen.getByText(commonEN['hello-world'])).toBeInTheDocument();
  });
});
