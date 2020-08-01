import React from 'react';
import { render, screen } from '@testing-library/react';

import { Trans } from './Trans';

describe('Trans component', () => {
  it('should render Trans without errors', () => {
    const t = (str: string) => str;
    const result = () =>
      render(<Trans translation={t('hola nico')}>hola nico</Trans>);
    expect(result).not.toThrow();
  });

  it('should be defined when render', () => {
    const t = (str: string) => str;

    const { container } = render(
      <Trans translation={t('hola nico')}>hola nico</Trans>
    );
    expect(container.firstChild).toBeTruthy();
  });

  it('should render the fallback if the translation is empty', () => {
    const t = (str: string) => '';

    render(<Trans translation={t('adios_nico')}>hola nico</Trans>);
    expect(screen.queryByText(/adios_nico/)).toBeNull();
    expect(screen.queryByText(/hola nico/)).not.toBeNull();
  });

  it('should render a string with html correctly', () => {
    const t = (str: string) => '<strong>0</strong>';

    const { container } = render(
      <Trans translation={t('adios_nico')}>hola nico</Trans>
    );
    expect(screen.queryByText(/hola nico/)).toBeNull();
    expect(container.querySelector('strong')).not.toBeNull();
  });

  it('should render translation prop as an array', () => {
    const t = (str: string) => str;

    render(<Trans translation={[t('hola'), t('nico')]}>hola nico</Trans>);
    expect(screen.queryByText(/hola nico/)).not.toBeNull();
  });
});
