import { configure, addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

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

configure([require.context('../src', true, /\.stories\.tsx$/)], module);
