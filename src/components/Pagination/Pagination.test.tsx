import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import createMockRouter from '@/__testUtils__/createMockRouter';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  const mockRouter = createMockRouter({ query: { query: '', page: '1', per_page: '10' } });

  it('updates the URL parameter when changing pages', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination totalPages={5} />
      </RouterContext.Provider>
    );

    const nextBtn = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('page=2'));
  });

  it('updates the URL parameter when changing pages with "Prev" button', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <Pagination totalPages={5} />
      </RouterContext.Provider>
    );

    const prevBtn = screen.getByRole('button', { name: /prev/i });
    fireEvent.click(prevBtn);

    expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('page=1'));
  });
});
