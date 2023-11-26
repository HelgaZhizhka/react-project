import { render, screen, fireEvent } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';

import createMockRouter from '@/__testUtils__/createMockRouter';
import { PhotoItem } from '@/__testUtils__/mockData';
import Card from './Card';

describe('Card Component', () => {
  it('should renders relevant card data', () => {
    const mockRouter = createMockRouter({ query: { query: '', page: '1', per_page: '10' } });
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...PhotoItem} />
      </RouterContext.Provider>
    );

    fireEvent.load(screen.getByAltText(PhotoItem.alt));
    const image = screen.getByAltText(PhotoItem.alt) as HTMLImageElement;
    const encodedUrl = encodeURIComponent(PhotoItem.src.medium);

    expect(image).toBeInTheDocument();
    expect(image.src).toContain(encodedUrl);
  });

  it('should display detailed information when isDetailed is true', () => {
    const id = '247600';
    const mockRouter = createMockRouter({
      pathname: `/${id}`,
      query: { query: '', page: '1', per_page: '10' },
    });
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...PhotoItem} isDetailed={true} />
      </RouterContext.Provider>
    );

    fireEvent.load(screen.getByAltText(PhotoItem.alt));

    expect(screen.getByRole('link')).toHaveAttribute('href', PhotoItem.photographer_url);
  });

  it('should navigate to detailed page on card click', () => {
    const mockRouter = createMockRouter({ query: { query: '', page: '1', per_page: '10' } });
    render(
      <RouterContext.Provider value={mockRouter}>
        <Card {...PhotoItem} />
      </RouterContext.Provider>
    );

    fireEvent.click(screen.getByRole('listitem'));

    expect(mockRouter.push).toHaveBeenCalledWith(
      expect.stringContaining(`${PhotoItem.id}`),
      undefined,
      { scroll: false }
    );
  });
});
