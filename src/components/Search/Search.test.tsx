import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '@/store';
import Search from './Search';

describe('Search Component', async () => {
  it('saves the input value when the search button is clicked', async () => {
    const mockOnSearch = vi.fn();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Search onSearch={mockOnSearch} />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const inputElement = screen.getByPlaceholderText('Search...');
      const searchButton = screen.getByText(/Search/i);
      fireEvent.change(inputElement, { target: { value: 'Test query' } });

      expect(inputElement).toHaveValue('Test query');
      fireEvent.click(searchButton);

      expect(mockOnSearch).toHaveBeenCalledWith('Test query');
    });
  });
});
