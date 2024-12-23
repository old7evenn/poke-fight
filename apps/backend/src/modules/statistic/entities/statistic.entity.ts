import { Pokemon } from '@/modules/pokemon/entities';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('statistic')
export class Statistic {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'Unique Statistic identifier',
    example: 'f4b3b15a-60f8-4a3f-8e98-982b6c4f1623',
  })
  id: string;

  @Column({ type: 'int', nullable: false, unique: true })
  @ApiProperty({ description: 'Pokemon id', example: 7 })
  pokemonId: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @ApiProperty({
    description: 'Likes',
    example: 9,
  })
  smash: number;

  @Column({ type: 'int', nullable: false, default: 0 })
  @ApiProperty({
    description: 'Dislikes',
    example: 2,
  })
  pass: number;
}
