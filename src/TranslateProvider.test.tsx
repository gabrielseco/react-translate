import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import {
  TranslateProvider,
  TranslateContext,
  useTranslate,
  withTranslate,
  tFunction
} from './index';

const commonEN = {
  'hello-world': 'hello world',
  'hello-world-with-interpolations': 'hello world my name is {{value}}',
  'hard-interpolation':
    'This is a fallback in case that <strong>the component</strong> does not load correctly',
  'hard-interpolation-with-props': 'This is my count <strong>{{count}}</strong>'
};
const commonES = {
  'hello-world': 'hola mundo',
  'hello-world-with-interpolations': 'hola mundo mi nombre es {{value}}',
  'hard-interpolation':
    'Esto es un fallback en caso de que <strong>el componente</strong> no se cargue bien',
  'hard-interpolation-with-props': 'Mi cuenta es <strong>{{count}}</strong>'
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

const Component = ({ children }: { children: any }) => {
  const providerValue = {
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
    <TranslateProvider value={providerValue}>{children}</TranslateProvider>
  );
};

describe('TranslationProvider', () => {
  let languageGetter: jest.SpyInstance;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  });
  it('should render with the context passed', () => {
    languageGetter.mockReturnValue('en');

    const { container } = render(
      <Component>
        <TranslateContext.Consumer>
          {context => {
            return <pre>{context && context.lang}</pre>;
          }}
        </TranslateContext.Consumer>
      </Component>
    );
    expect(container.querySelector('pre')?.textContent).toBe('en');
  });
});

describe('useTranslate', () => {
  const TranslationExample = ({
    literal,
    options
  }: {
    literal: string;
    options?: any;
  }) => {
    const { t } = useTranslate('common', 'dashboard');
    return <p>{t(literal, options)}</p>;
  };

  let languageGetter: jest.SpyInstance;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  });

  it('should return the literal expected', () => {
    const { container } = render(
      <Component>
        <TranslationExample literal="common:hello-world"></TranslationExample>
      </Component>
    );

    const p = container.querySelector('p');

    expect(p?.textContent).toBe(commonEN['hello-world']);
  });

  it('should return the a literal with interpolations', () => {
    const { getByText } = render(
      <Component>
        <TranslationExample
          literal="common:hello-world-with-interpolations"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
      </Component>
    );

    expect(getByText(/Gabriel/)).toBeDefined();
  });

  it('should return the a literal with dot notation', () => {
    languageGetter.mockReturnValue('en');

    const { container } = render(
      <Component>
        <TranslationExample literal="dashboard:broncano.say.hi"></TranslationExample>
      </Component>
    );

    expect(container.querySelector('p')?.textContent).toBe(
      dashboardEN.broncano.say.hi
    );
  });

  it('should return the literal in english and after in spanish', () => {
    const { container } = render(
      <Component>
        <TranslationExample
          literal="common:hello-world"
          options={{ value: 'Gabriel' }}
        ></TranslationExample>
        <TranslateContext.Consumer>
          {context => {
            return (
              <button onClick={() => context && context.switchLanguage('es')}>
                change lang
              </button>
            );
          }}
        </TranslateContext.Consumer>
      </Component>
    );

    const p = container.querySelector('p');
    const button = container.querySelector('button');

    expect(p?.textContent).toBe(commonEN['hello-world']);

    if (button) {
      //TODO: THIS IS BAD
      fireEvent.click(button);

      expect(p?.textContent).toBe(commonES['hello-world']);
    }
  });
});

describe('withTranslate', () => {
  const TranslationExample = ({ t }: { t: tFunction }) => {
    return <p>{t('common:hello-world')}</p>;
  };

  const EnhancedTranslation = withTranslate('common')(TranslationExample);

  let languageGetter: jest.SpyInstance;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  });

  it('should return a literal correctly', () => {
    languageGetter.mockReturnValue('en');
    const { container } = render(
      <Component>
        <EnhancedTranslation />
      </Component>
    );

    const p = container.querySelector('p');

    expect(p?.textContent).toBe(commonEN['hello-world']);
  });
});
