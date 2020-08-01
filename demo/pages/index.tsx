import React from 'react';
import Head from 'next/head';
import { TranslateProvider, useTranslate, Trans } from '@rogal/react-translate';

import commonES from './../locales/es/common.json';
import dashboardES from './../locales/es/dashboard.json';
import commonEN from './../locales/en/common.json';
import dashboardEN from './../locales/en/dashboard.json';

const Children = () => {
  const { t, lang, switchLanguage } = useTranslate();
  const [count, setCount] = React.useState(0);
  return (
    <React.Fragment>
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
      <button onClick={() => setCount((count) => count + 1)}>
        increment count
      </button>
      <button onClick={() => switchLanguage('es')}>
        cambiar lenguage a es
      </button>
      <button onClick={() => switchLanguage('en')}>
        cambiar lenguage a en
      </button>
    </React.Fragment>
  );
};

const Home = (): JSX.Element => {
  const i18n = {
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
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TranslateProvider i18n={i18n}>
        <Children />
      </TranslateProvider>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
