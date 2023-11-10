import { setupServer } from 'msw/node';
import { handlers } from './handlers';
export const server = setupServer(...handlers);

export const setup = async () => {
  await server.listen();
}

export const teardown = async () => {
  await server.close();
}