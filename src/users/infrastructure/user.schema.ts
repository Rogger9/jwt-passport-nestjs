import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IUser } from '../domain/user.entity'

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('text', { unique: true })
  email: string

  @Column('text')
  password: string
}
