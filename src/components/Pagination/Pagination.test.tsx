import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import { Home } from '@/pages/Home';

const DELAY = 3000;

describe('Pagination Component', async () => {
  it('updates the URL parameter when changing pages', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const pageNum = new URLSearchParams(window.location.href).get('page');
      const nextBtn = screen.getByRole('button', { name: /next/i });
      expect(nextBtn).toBeInTheDocument();
      fireEvent.click(nextBtn);

      setTimeout(() => {
        expect(pageNum).toBe('2');
      }, DELAY);
    });
  });

  it('updates the URL parameter when changing pages with "Prev" button', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(async () => {
      const pageNum = new URLSearchParams(window.location.href).get('page');
      const prevBtn = screen.getByRole('button', { name: /prev/i });
      expect(prevBtn).toBeInTheDocument();

      fireEvent.click(prevBtn);

      setTimeout(() => {
        expect(pageNum).toBe('1');
      }, 3000);
    });
  });
});
