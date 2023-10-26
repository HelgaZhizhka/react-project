import { ApiError } from './interfaces';

export function isErrorWithMessage(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'message' in error;
}
