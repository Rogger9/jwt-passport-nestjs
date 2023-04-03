import { User } from 'src/users/entities'

export interface ITokens {
  accessToken: string
  refreshToken: string
}

export interface ILoginResponse {
  user: Pick<User, 'id' | 'email'>
  tokens: ITokens
}
