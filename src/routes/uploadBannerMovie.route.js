/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import stream from 'stream'

import cloudinary from '~/configs/cloudinary.config'

const router = Router()
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/

  const extname = path.extname(file.originalname).toLowerCase()
  const mimetype = file.mimetype

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Images only'))
  }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single('image')

router.post('/banner', (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      res.status(400).send({ message: err.message })
    } else if (req.file) {
      try {
        const result = await cloudinary.uploader.upload_stream(
          {
            folder: 'banners',
            public_id: `banner-${Date.now()}`,
          },
          (error, result) => {
            if (error) {
              return res
                .status(500)
                .send({ message: 'Upload to Cloudinary failed', error })
            }
            res.status(200).send({
              message: 'Image uploaded successfully',
              image: result?.secure_url,
            })
          }
        )
        const bufferStream = new stream.PassThrough()
        bufferStream.end(req.file.buffer)
        bufferStream.pipe(result)
      } catch (error) {
        res.status(500).send({ message: 'Upload to Cloudinary failed', error })
      }
    } else {
      res.status(400).send({ message: 'No image file provided' })
    }
  })
})

export const UploadBannerMovie = router
