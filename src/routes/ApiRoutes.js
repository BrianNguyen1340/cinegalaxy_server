import { Router } from 'express'

import { AuthRoute } from './auth.route'
import { UserRouter } from './user.route'
import { CinemaComplexRoute } from './cinemaComplex.route'
import { CinemaRoute } from './cinema.route'
import { GenreRoute } from './genre.route'
import { MovieRoute } from './movie.route'
import { RoomRoute } from './room.route'
import { SeatRoute } from './seat.route'
import { ShowtimeRoute } from './showtime.route'
import { ShowtimeSeatStautsRoute } from './showtimeSeatStatus.route'
import { ProductCategoryRoute } from './productCategory.route'
import { ProductRoute } from './product.route'
import { UploadPosterMovie } from './uploadPosterMovie.route'
import { UploadBannerMovie } from './uploadBannerMovie.route'
import { UploadProduct } from './uploadProduct.route'
import { MovieTicketRoute } from './movieTicket.route'
import { ServiceTicketRoute } from './serviceTicket.route'
import { OrderRoute } from './order.route'
import { PromotionRoute } from './promotion.route'
import { RevenueRoute } from './revenue.route'

const router = Router()

export const initAPIRoutes = (app) => {
  router.use('/auth', AuthRoute)
  router.use('/user', UserRouter)
  router.use('/cinema-complex', CinemaComplexRoute)
  router.use('/cinema', CinemaRoute)
  router.use('/genre', GenreRoute)
  router.use('/movie', MovieRoute)
  router.use('/room', RoomRoute)
  router.use('/seat', SeatRoute)
  router.use('/showtime', ShowtimeRoute)
  router.use('/showtime-seat-status', ShowtimeSeatStautsRoute)
  router.use('/product-category', ProductCategoryRoute)
  router.use('/product', ProductRoute)
  router.use('/upload', UploadPosterMovie)
  router.use('/upload', UploadBannerMovie)
  router.use('/upload', UploadProduct)
  router.use('/movie-ticket', MovieTicketRoute)
  router.use('/service-ticket', ServiceTicketRoute)
  router.use('/order', OrderRoute)
  router.use('/promotion', PromotionRoute)
  router.use('/revenue', RevenueRoute)

  return app.use('/api/v1', router)
}
