import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createHash, validateHash } from 'src/utils/encrypt'

@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  hash(value: string) {
    const salt = this.configService.get('config.saltHash')
    return createHash(value, salt)
  }

  isValidHash(value: string, hash: string) {
    return validateHash(value, hash)
  }
}
