import { render, screen } from '@testing-library/react';
import { RouterProvider } from 'react-router-dom';
import { createTestRouter } from '@/__tests__/testUtils';

describe('NotFoundPage Component', () => {
  it('displays when navigating to an invalid route', () => {
    const router = createTestRouter(['/some/non-existent/route']);

    render(<RouterProvider router={router} />);

    expect(screen.getByText("Sorry, there's nothing here 🥲")).toBeInTheDocument();
    expect(screen.getByText('Go to home page')).toBeInTheDocument();
  });
});
