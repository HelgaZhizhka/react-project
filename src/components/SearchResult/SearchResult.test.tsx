import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SearchResultContext } from '@/contexts';
import { PhotoData } from '@/__tests__/mockData';
import SearchResult from './SearchResult';

describe('SearchResult testing', () => {
  test('displays data card in links', async () => {
    render(
      <BrowserRouter>
        <SearchResultContext.Provider value={{ searchResult: PhotoData, currentPage: 1 }}>
          <SearchResult />
        </SearchResultContext.Provider>
        ,
      </BrowserRouter>
    );

    await waitFor(() => {
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(PhotoData.length);
    });
  });

  test('displays with loading data with src attribute', async () => {
    const photoSrc = PhotoData[0].alt;

    render(
      <BrowserRouter>
        <SearchResultContext.Provider value={{ searchResult: PhotoData, currentPage: 1 }}>
          <SearchResult />
        </SearchResultContext.Provider>
        ,
      </BrowserRouter>
    );

    await waitFor(() => {
      const images = screen.getAllByAltText('string');
      const imageWithAlt = images.find((img) => img.getAttribute('alt') === photoSrc);
      expect(imageWithAlt).toBeInTheDocument();
    });
  });

  test('displays a message if no cards are present', async () => {
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
