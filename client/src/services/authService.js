import { request } from './api';

export const register = (payload) => request('POST', '/auth/register', payload);
export const login = (payload) => request('POST', '/auth/login', payload);
