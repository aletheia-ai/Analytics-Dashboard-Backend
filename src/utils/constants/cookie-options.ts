import { CookieOptions } from 'express';

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
};
