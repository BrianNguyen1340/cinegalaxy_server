import { allowedOrigins } from '~/configs/corsOption.config'

export const credentials = (req, res, next) => {
  const origin = req.headers.origin
  if (origin && allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true')
  }
  next()
}
