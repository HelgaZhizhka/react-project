import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import createMockRouter from '@/__testUtils__/createMockRouter';
import Search from './Search';

it('saves the input value when the search button is clicked', () => {
  const mockRouter = createMockRouter({ query: { query: '', page: '1', per_page: '10' } });
  render(
    <RouterContext.Provider value={mockRouter}>
      <Search />
    </RouterContext.Provider>
  );

  const searchInput = screen.getByPlaceholderText('Search...');
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(searchInput, { target: { value: 'test query' } });
  fireEvent.click(searchButton);

  expect(mockRouter.push).toHaveBeenCalledWith(expect.stringContaining('query=test query'));
});
