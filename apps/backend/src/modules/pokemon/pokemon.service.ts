import { Injectable } from '@nestjs/common';
import { Pokemon } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/shared';

@Injectable()
export class PokemonService extends BaseService<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    private readonly PokemonRepository: Repository<Pokemon>
  ) {
    super(PokemonRepository);
  }
}
