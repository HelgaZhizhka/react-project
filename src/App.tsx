import { AppRoutes } from '@/routes';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const App: React.FC = () => (
  <ErrorBoundary>
    <AppRoutes />
  </ErrorBoundary>
);

export default App;
