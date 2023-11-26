import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { PhotoItem } from '@/__testUtils__/mockData';
import createMockRouter from '@/__testUtils__/createMockRouter';
import About from './About';

describe('Details Component', () => {
  const id = '247600';
  const mockRouter = createMockRouter({
    pathname: `/about/${id}`,
    query: { query: '', page: '1', per_page: '10' },
  });

  it('displays detailed card data correctly', async () => {
    const asFragment = render(
      <RouterContext.Provider value={mockRouter}>
        <About photoData={PhotoItem} />
      </RouterContext.Provider>
    );
    const closeButton = screen.getByText(/Close/i);
    expect(asFragment).toMatchSnapshot();

    await waitFor(() => {
      expect(closeButton).toBeInTheDocument();
    });
  });

  it('redirects to the home page when the close button is clicked', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <About photoData={PhotoItem} />
      </RouterContext.Provider>
    );

    const closeButton = screen.getByText(/Close/i);
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalled();
    });
  });
});
