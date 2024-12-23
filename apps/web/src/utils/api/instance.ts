import { HttpClient } from './http-client';

export const pokeApi = new HttpClient({
  baseURL: 'http://localhost:3000/api',
});
