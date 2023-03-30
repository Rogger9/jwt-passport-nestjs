import { ApiProperty } from '@nestjs/swagger'
import { ValidRoles } from 'src/auth/interfaces'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @ApiProperty({
    example: 'f2d7a6ee-160c-4abc-b112-a6234a7f1bbc',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty({
    example: 'correo@correo.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', { unique: true })
  email: string

  @ApiProperty()
  @Column('text', { select: false })
  password: string

  @ApiProperty()
  @Column('text')
  name: string

  @ApiProperty()
  @Column('bool', { default: true })
  isActive: boolean

  @ApiProperty({
    example: [ValidRoles.USER],
    description: 'User roles',
  })
  @Column('text', { array: true, default: [ValidRoles.USER] })
  roles: ValidRoles[]
}
