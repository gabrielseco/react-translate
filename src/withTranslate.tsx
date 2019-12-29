import React from 'react';

import useTranslate from './useTranslate';

const withTranslate = (Component: any): any => {
  function WrapperComponent(): JSX.Element {
    const { t } = useTranslate();
    return <Component t={t} />;
  }

  return WrapperComponent;
};

export default withTranslate;
