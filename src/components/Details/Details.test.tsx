import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import { createTestRouter } from '@/__tests__/testUtils';

const router = createTestRouter([`/details/247600?page=1`]);

describe('Details Component', async () => {
  it('displays a loading spinner during data fetching', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    await waitFor(() => {
      const spinner = screen.getAllByRole('loader');
      expect(spinner).toHaveLength(1);
    });
  });

  it('displays detailed card data correctly', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );

    await waitFor(() => {
      const closeButton = screen.getByText(/Close/i);
      expect(closeButton).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    );
    await waitFor(() => {
      const closeButton = screen.getByText(/Close/i);
      fireEvent.click(closeButton);
      expect(closeButton).not.toBeInTheDocument();
    });
  });
});
