import * as bcrypt from 'bcrypt'

export const createHash = (value: string, salt: number) => bcrypt.hash(value, salt)

export const validateHash = (value: string, hash: string) => bcrypt.compare(value, hash)
