import { render, waitFor, screen, fireEvent } from '@testing-library/react';

import { PhotoItem } from '@/__tests__/mockData';
import Card from './Card';

describe('Card Component', () => {
  test('renders relevant card data', async () => {
    render(<Card {...PhotoItem} />);

    const image = screen.getByAltText(PhotoItem.alt);
    fireEvent.load(image);

    await waitFor(() => {
      expect(screen.getByText(`Photographer: ${PhotoItem.photographer}`)).toBeInTheDocument();
    });
  });
});
