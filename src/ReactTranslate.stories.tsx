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

  const { lang } = context;

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
          I have <strong>{count}</strong> pokemones
        </Trans>
      </pre>
      <button onClick={() => setCount(count => count + 1)}>
        increment count
      </button>
    </>
  );
};

const Component = ({ t }: { t: tFunction }) => {
  return <pre>{t('common:hello-world')}</pre>;
};

const EnhancedComponent = withTranslate(Component);

export const TranslateDemo = () => {
  return (
    <>
      <Children />
      <EnhancedComponent />
    </>
  );
};
