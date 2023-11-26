import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import { PhotoItem } from '@/__testUtils__/mockData';
import createMockRouter from '@/__testUtils__/createMockRouter';
import About from './About';

describe('Details Component', () => {
  const mockRouter = createMockRouter({ query: { id: '247600' } });

  it('displays detailed card data correctly', async () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <About photoData={PhotoItem} />
      </RouterContext.Provider>
    );
    const closeButton = screen.getByText(/Close/i);

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
