import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { fetchCountries } from '@/store/features/countriesSlice';
import { Routes } from '@/routes';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return <Routes />;
};

export default App;
