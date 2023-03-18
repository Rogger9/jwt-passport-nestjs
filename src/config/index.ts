import { registerAs } from '@nestjs/config'
import database from './database'

export default registerAs('config', () => ({
  port: +process.env.PORT || 3000,
  isMongo: process.env.DB_TYPE === DB_TYPES.MONGODB,
  saltHash: +process.env.SALT_HASH,
}))

export enum NODE_ENV {
  DEV = 'dev',
  PROD = 'prod',
  TEST = 'test',
}

export enum DB_TYPES {
  POSTGRES = 'postgres',
  MONGODB = 'mongodb',
}

export { database }
