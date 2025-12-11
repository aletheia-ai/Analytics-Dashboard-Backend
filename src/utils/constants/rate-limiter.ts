//src/utils/constants/rate-limiter.ts
export const rateLimiter = {
  windowMs: 60 * 60 * 1000,
  max: 100000,
  message: 'Too many requests, please try again after an hour',
  standardHeaders: true,
  legacyHeaders: false,
};
