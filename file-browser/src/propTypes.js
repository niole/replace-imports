import { shape, string, number } from 'prop-types';

export const userShape = shape({
  username: string.isRequired,
});

export const revisionShape = shape({
  sha: string.isRequired,
  message: string.isRequired,
  timestamp: number.isRequired,
  url: string.isRequired,
  author: userShape.isRequired,
});
