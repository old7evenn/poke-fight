import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique Pokémon identifier',
    example: 'f4b3b15a-60f8-4a3f-8e98-982b6c4f1623',
  })
  id: string;

  @Column({ name: 'pokemon_id', type: 'int', nullable: false })
  @ApiProperty({ description: 'Pokémon id', example: 7 })
  pokemonId: number;

  @Column({ type: 'text', unique: true, nullable: false })
  @ApiProperty({
    description: 'Pokémon image URL',
    example: 'https://example.com/images/pikachu.png',
  })
  image: string;

  @Column({ type: 'text', unique: true, nullable: false })
  @ApiProperty({
    description: 'Pokémon name',
    example: 'Pikachu',
  })
  name: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty({
    description: 'Pokémon description',
    example:
      'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  })
  description: string;

  @Column({ type: 'text', array: true, default: [], nullable: false })
  @ApiProperty({
    description: 'Pokémon types',
    example: ['Electric'],
    isArray: true,
    type: String,
  })
  types: string[];
}
