import rateLimit from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 2,
    message: "Too many requests, try again after 1 year",
    standardHeaders: true,
    legacyHeaders: false
})

export const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: "Too many requests, try again after 1 year",
    skip: (req) => !req.originalUrl.includes('/api/auth')
    
})
