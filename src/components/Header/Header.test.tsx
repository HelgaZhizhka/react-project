import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Header } from '.';

describe('Header', () => {
  test('should show text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const linkElement = getByText(/Photo gallery/i);
    expect(linkElement).toBeInTheDocument();
  });
});
