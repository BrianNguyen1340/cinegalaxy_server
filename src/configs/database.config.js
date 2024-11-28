/**
 * @copyright 2024 Brian Nguyen
 * "I turn lines of code into game-changing solutions!"
 */

// import { MongoClient, ServerApiVersion } from 'mongodb'

// import { varEnv } from '~/configs/variableEnv.config'

// let databaseInstance = null

// const mongoClientInstance = new MongoClient(varEnv.MONGO_DB_ATLAS, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// })

// export const CONNECT_DB = async () => {
//   await mongoClientInstance.connect(varEnv.DATABASE_NAME)
//   databaseInstance = mongoClientInstance.db()
// }

// export const GET_DB = () => {
//   if (!databaseInstance) throw new Error('Must connect to Database first!')
//   return databaseInstance
// }

// export const CLOSE_DB = async () => {
//   await mongoClientInstance.close()
// }

import mongoose from 'mongoose'

import { varEnv } from '~/configs/variableEnv.config'

export const CONNECT_DB = async () => {
  try {
    const connection = await mongoose.connect(varEnv.MONGO_DB_ATLAS)
    return connection
  } catch (error) {
    throw new Error(error.message)
  }
}

export const CLOSE_DB = async () => {
  try {
    await mongoose.connection.close()
  } catch (error) {
    throw new Error(error.message)
  }
}
