import React from 'react';

import { useTranslate } from './useTranslate';

export const withTranslate = (Component: any): any => {
  function WrapperComponent(): JSX.Element {
    const props = useTranslate();
    return <Component {...props} />;
  }

  return WrapperComponent;
};
