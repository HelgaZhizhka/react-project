import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { PhotoData } from '@/__tests__/mockData';
import SearchResult from './SearchResult';

describe('SearchResult testing', () => {
  it('should render the specified number of cards', () => {
    render(
      <BrowserRouter>
        <SearchResult searchResult={PhotoData} />
      </BrowserRouter>
    );

    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(PhotoData.length);
  });

  it('should display a message if no cards are present', () => {
    render(
      <BrowserRouter>
        <SearchResult searchResult={[]} />
      </BrowserRouter>
    );

    expect(screen.getByText(/No cards available/i)).toBeInTheDocument();
  });
});
