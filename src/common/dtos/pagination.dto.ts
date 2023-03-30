import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator'

export class PaginationDto {
  @ApiPropertyOptional({ default: 10, description: 'How many rows do you need' })
  @IsOptional()
  @IsPositive()
  limit?: number

  @ApiPropertyOptional({ default: 0, description: 'How many rows do you want to skip' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number
}
