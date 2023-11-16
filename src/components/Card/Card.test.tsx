import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { SearchResultContext } from '@/contexts';
import { PhotoData } from '@/__tests__/mockData';
import Card from './Card';

describe('Card Component', () => {
  it('should renders relevant card data', async () => {
    render(
      <BrowserRouter>
        <SearchResultContext.Provider value={{ searchResult: PhotoData, currentPage: 1 }}>
          <Card {...PhotoData[0]} currentPage={1} />
        </SearchResultContext.Provider>
      </BrowserRouter>
    );

    const image = screen.getByAltText(PhotoData[0].alt);
    fireEvent.load(image);

    await waitFor(() => {
      expect(screen.getByText(`Photographer: ${PhotoData[0].photographer}`)).toBeInTheDocument();
      expect(image).toBeInTheDocument();
    });
  });
});
