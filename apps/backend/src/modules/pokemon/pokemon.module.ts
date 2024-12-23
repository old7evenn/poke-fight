import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pokemon } from './entities';

@Module({
  providers: [PokemonService],
  imports: [TypeOrmModule.forFeature([Pokemon])],
  exports: [TypeOrmModule],
  controllers: [PokemonController],
})
export class PokemonModule {}
