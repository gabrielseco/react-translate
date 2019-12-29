import React from 'react';

import {
  TranslateProvider,
  TranslateContext,
  Trans,
  useTranslate,
  withTranslate,
  tFunction
} from './index';

export default {
  title: 'ReactTranslate',
  component: TranslateProvider
};

const Children = () => {
  const { t } = useTranslate();
  const [count, setCount] = React.useState(0);
  const context = React.useContext(TranslateContext);

  if (!context) {
    return null;
  }

  const { lang, switchLanguage } = context;

  return (
    <>
      <pre>{lang}</pre>
      <pre>{t('dashboard:broncano.say.hi')}</pre>
      <pre>{t('common:hello-world')}</pre>
      <pre>
        {t('common:hello-world-with-interpolations', {
          value: 'Gabriel'
        })}
      </pre>
      <pre>
        <Trans translation={t('common:hard-interpolation')}>
          This is a fallback in case that <strong>the component</strong> does
          not load correctly
        </Trans>
      </pre>

      <pre>
        <Trans
          translation={t('common:hard-interpolation-with-props', {
            count: count
          })}
        >
          This is my count <strong>{count}</strong>
        </Trans>
      </pre>
      <button onClick={() => setCount(count => count + 1)}>
        increment count
      </button>
      <button onClick={() => switchLanguage('es')}>
        cambiar lenguage a es
      </button>
      <button onClick={() => switchLanguage('en')}>
        cambiar lenguage a en
      </button>
    </>
  );
};

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

const Component = ({ t }: { t: tFunction }) => {
  return <pre>{t('common:hello-world')}</pre>;
};

const EnhancedComponent = withTranslate(Component);

export const TranslateDemo = () => {
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
    <TranslateProvider value={providerValue}>
      <Children />
      <EnhancedComponent />
    </TranslateProvider>
  );
};
