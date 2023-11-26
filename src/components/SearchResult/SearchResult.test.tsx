import { render, screen } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import createMockRouter from '@/__testUtils__/createMockRouter';
import { PhotoData } from '@/__testUtils__/mockData';
import SearchResult from './SearchResult';

describe('SearchResult testing', () => {
  const mockRouter = createMockRouter({ query: { query: '', page: '1', per_page: '10' } });

  it('should render the specified number of cards', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResult photos={PhotoData} />
      </RouterContext.Provider>
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(PhotoData?.length);
  });

  it('should display a message if no cards are present', () => {
    render(
      <RouterContext.Provider value={mockRouter}>
        <SearchResult photos={[]} />
      </RouterContext.Provider>
    );

    expect(screen.getByText(/No cards available/i)).toBeInTheDocument();
  });
});
