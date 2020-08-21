import React from 'react';

import { useTranslate } from './useTranslate';

export const withTranslate = (Component: any): any => {
  function WrapperComponent(wrapperProps: any) {
    const props = useTranslate();
    return <Component {...props} {...wrapperProps} />;
  }

  return WrapperComponent;
};
