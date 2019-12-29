import React from 'react';

import useTranslate from './useTranslate';

const withTranslate = (...args: string[]) => (
  Component: any
): (() => JSX.Element) => {
  function WrapperComponent(): JSX.Element {
    const { t } = useTranslate(...args);
    return <Component t={t} />;
  }

  return WrapperComponent;
};

export default withTranslate;
