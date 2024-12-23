import { Pokemon } from '@/modules/pokemon/entities';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponse {
  @ApiProperty({
    description: 'Pokemons',
  })
  pokemons: Pokemon[];

  @ApiProperty({
    description: 'The current page number (starting from 1)',
    example: 3,
  })
  page: number;

  @ApiProperty({
    description: 'The number of items to retrieve per page',
    example: 8,
  })
  offset: number;

  @ApiProperty({
    description: 'The total number of items available',
    example: 80,
  })
  itemCount: number;

  @ApiProperty({
    description: 'The total number of pages available based on the item count and take',
    example: 4,
  })
  pageCount: number;

  @ApiProperty({
    description: 'Indicates if there is a previous page available',
    example: true,
  })
  prev: boolean;

  @ApiProperty({
    description: 'Indicates if there is a next page available',
    example: false,
  })
  next: boolean;
}
