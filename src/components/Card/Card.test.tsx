import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { PhotoData } from '@/__tests__/mockData';
import Card from './Card';

describe('Card Component', () => {
  it('should renders relevant card data', () => {
    render(
      <BrowserRouter>
        <Card {...PhotoData[0]} />
      </BrowserRouter>
    );

    fireEvent.load(screen.getByAltText(PhotoData[0].alt));

    expect(screen.getByText(`Photographer: ${PhotoData[0].photographer}`)).toBeInTheDocument();
    const image = screen.getByAltText(PhotoData[0].alt);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', PhotoData[0].src.medium);
  });

  it('should display detailed information when isDetailed is true', () => {
    render(
      <BrowserRouter>
        <Card {...PhotoData[0]} isDetailed={true} />
      </BrowserRouter>
    );

    fireEvent.load(screen.getByAltText(PhotoData[0].alt));

    expect(screen.getByRole('link')).toHaveAttribute('href', PhotoData[0].photographer_url);
  });

  it('should render relevant card data and handle click event', () => {
    const mockOnClickCard = vi.fn();

    render(
      <BrowserRouter>
        <Card {...PhotoData[0]} onClickCard={mockOnClickCard} />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(mockOnClickCard).toHaveBeenCalledWith(PhotoData[0].id);
  });
});
