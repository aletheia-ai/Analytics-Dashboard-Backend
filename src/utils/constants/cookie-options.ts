//src/utils/constants/cookie-option.ts

import { CookieOptions } from 'express';

export const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: !process.env.STORE ? 'none' : 'lax',
  secure: !process.env.STORE ? true : false,
  maxAge: 24 * 60 * 60 * 1000,
};
