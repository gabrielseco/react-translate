import React from 'react';

import { useTranslate } from './useTranslate';

export const withTranslate = (Component: any): any => {
  function WrapperComponent(componentProps: any) {
    const props = useTranslate();
    return <Component {...props} {...componentProps} />;
  }

  return WrapperComponent;
};
