import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { createTestRouter } from '@/__tests__/testRouter';

describe('Header', () => {
  it('should show text in Header', () => {
    const router = createTestRouter(['/']);

    render(<RouterProvider router={router} />);

    const linkElement = screen.getByText(/Photo gallery/i);
    expect(linkElement).toBeInTheDocument();
  });
});
