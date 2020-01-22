import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import withReactTranslate from './translate/register';
import commonES from '../demo/locales/es/common.json';
import dashboardES from '../demo/locales/es/dashboard.json';
import commonEN from '../demo/locales/en/common.json';
import dashboardEN from '../demo/locales/en/dashboard.json';

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true })
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});
addDecorator(withKnobs);
addDecorator(
  withReactTranslate({
    languages: ['en', 'es'],
    language: 'en',
    fallbackLng: 'en',
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
  })
);

configure([require.context('../src', true, /\.stories\.tsx$/)], module);
