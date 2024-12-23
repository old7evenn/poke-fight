import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'The number of items to retrieve per page',
    example: 10,
    minimum: 1,
  })
  @IsInt({ message: 'Limit must be an integer' })
  @Min(1)
  limit: number;

  @ApiProperty({
    description: 'The number of items to skip before starting to collect the result set',
    example: 0,
    minimum: 0,
  })
  @IsInt({ message: 'Offset must be an integer' })
  @Min(0)
  offset: number;
}
