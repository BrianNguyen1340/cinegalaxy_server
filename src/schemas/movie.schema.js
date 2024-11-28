import { model, Schema } from 'mongoose'

const MovieSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    director: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    posterURL: {
      type: String,
      trim: true,
      required: true,
    },
    bannerURL: {
      type: String,
      trim: true,
      required: true,
    },
    trailerURL: {
      type: String,
      required: true,
      trim: true,
      match: [
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i,
        'Vui lòng nhập đúng định dạng url!',
      ],
    },
    ageRating: {
      type: String,
      required: true,
      enum: [
        'P - Phổ biến',
        'K - Dành cho trẻ em',
        'C13 - Cấm khán giả dưới 13 tuổi',
        'C16 - Cấm khán giả dưới 16 tuổi',
        'C18 - Cấm khán giả dưới 18 tuổi',
      ],
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      enum: ['Thuyết minh', 'Phụ đề', 'Lồng tiếng'],
      trim: true,
    },
    movieFormat: {
      type: String,
      required: true,
      enum: ['2D', '3D'],
      trim: true,
    },
    genreIds: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Genre',
      },
    ],
    hidden: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    numberOfLikes: {
      type: Number,
      default: 0,
    },
    numberOfDislikes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export const MovieModel = model('Movie', MovieSchema, 'movie')
