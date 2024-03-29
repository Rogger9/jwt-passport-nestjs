import { registerAs } from '@nestjs/config'
import database from './database'

export default registerAs('config', () => ({
  port: +process.env.PORT || 3000,
  isMongo: process.env.DB_TYPE === DB_TYPES.MONGODB,
  saltHash: +process.env.SALT_HASH,
  jwtSecret: process.env.JWT_SECRET,
  jwtAccess: process.env.JWT_ACCESS_SECRET,
  jwtRefresh: process.env.JWT_REFRESH_SECRET,
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
