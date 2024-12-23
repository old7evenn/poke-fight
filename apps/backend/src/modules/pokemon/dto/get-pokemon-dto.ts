import { PaginationDto } from '@/shared/pagination';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GetPokemonDto extends PaginationDto {
  @ApiProperty({
    description: 'The name of the pokemon',
    example: 'bulbasaur',
  })
  name: string;

  @ApiProperty({
    isArray: true,
    description: 'Filter pokemons by type',
    example: ['electric', 'fire'],
  })
  @Transform(({ value }) => {
    if (!Array.isArray(value)) return [value];
    return value;
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  types?: string[];
}
