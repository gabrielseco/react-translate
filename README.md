# React-Translate [![NPM Version](https://img.shields.io/npm/v/@rogal/react-translate.svg)](https://www.npmjs.com/package/@rogal/react-translate) [![NPM Downloads](https://img.shields.io/npm/dm/@rogal/react-translate.svg)](https://www.npmjs.com/package/react-translate) [![Actions Status](https://github.com/gabrielseco/react-translate/workflows/build/badge.svg)](https://github.com/gabrielseco/react-translate/actions) [![Actions Status](https://github.com/gabrielseco/react-translate/workflows/ci/badge.svg)](https://github.com/gabrielseco/react-translate/actions)  [![Coverage Status](https://coveralls.io/repos/github/gabrielseco/react-translate/badge.svg?branch=master)](https://coveralls.io/github/gabrielseco/react-translate?branch=master)

> Easier i18n to be happier

react-translate can prevent you going crazy about react interpolation

## Install

```sh
npm install @rogal/react-translate --save
```

### Getting Started

```js
import React from 'react'
import {
  TranslateProvider,
  useTranslate,
} from '@rogal/react-translate';

const Childen = () => {
  const {t} = useTranslate();
  return <p>{t('common:helloWorld')}</p>
}
const App = () => {
  const providerValue = {
    fallbackLng: 'en',
    languages: ['en', 'es'],
    translations: {
      en: {
        common: {
          helloWorld: 'Hello world'
        },
      },
      es: {
        common: {
          helloWorld: 'Hola Mundo'
        },
      }
    }
  };
  return (
    <TranslateProvider value={providerValue}>
      <Children />
    </TranslateProvider>
  )
}

```

### How to instance a i18nConfiguration so you can use it outside of react

You only need to import the i18nConfiguration and passed the next config

```js
import {i18nConfiguration} from '@rogal/react-translate';
import commonES from 'locales/es/common';
import commonEN from 'locales/en/common';

const i18next = i18nConfiguration({
  languages: ['es', 'en'],
    translations: {
      es: {
        common: commonES
      },
      en: {
        common: commonEN
      }
    },
    fallbackLng: 'en',
    language: 'en'
});

const translation = i18next.t('helloWorld');

```


### More examples

You can check the demo folder or run the storybook so you can see advanced used cases

### Components

- A TranslateProvider to pass configuration data to the context.
- useTranslate hook to use the t function in your code and translate jsonKeys to strings
- withTranslate HOC to support class components
- A Trans component to have a fallback when translating


### Features

- i18n languages supported such as English or Spanish.
- Easy to use for dev experience
- Works with SSR


### How to contribute

You can install and have an enviroment ready for use with Storybook

```sh
  npm i
  npm start
```

## License

MIT