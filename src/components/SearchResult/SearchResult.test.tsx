import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SearchResultContext } from '@/contexts';
import { PhotoData } from '@/__tests__/mockData';
import SearchResult from './SearchResult';

describe('SearchResult testing', () => {
  it('should render the specified number of cards', async () => {
    render(
      <BrowserRouter>
        <SearchResultContext.Provider value={{ searchResult: PhotoData, currentPage: 1 }}>
          <SearchResult />
        </SearchResultContext.Provider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const cards = screen.getAllByRole('listitem');
      expect(cards).toHaveLength(PhotoData.length);
    });
  });

  it('should display a message if no cards are present', async () => {
    render(
      <BrowserRouter>
        <SearchResultContext.Provider value={{ searchResult: [], currentPage: 1 }}>
          <SearchResult />
        </SearchResultContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/No cards available/i)).toBeInTheDocument();
  });
});
