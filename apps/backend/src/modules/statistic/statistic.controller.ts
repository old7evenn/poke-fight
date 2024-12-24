import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BaseResolver, BaseResponse } from '@/shared';

import { StatisticService } from './statistic.service';

import {
  PaginationPokemonsStatisticResponse,
  PokemonStatisticResponse,
  StatisticResponse,
} from './statistic.model';
import { ActionPokemonDto } from './dto';
import { PokemonService, PokemonsResponse } from '../pokemon';
import { GetPokemonDto } from '../pokemon/dto';
import { SelectQueryBuilder } from 'typeorm';
import { PokemonStatistic } from './entities';

@ApiTags('statistic')
@Controller('/statistic')
export class StatisticController extends BaseResolver {
  constructor(
    private readonly statisticPokemonService: StatisticService,
    private readonly pokemonService: PokemonService
  ) {
    super();
  }

  @Get('/pokemons')
  @ApiOperation({ summary: 'get pokemons' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter pokemons by name',
  })
  @ApiQuery({
    name: 'types',
    required: false,
    type: String,
    description: 'Filter pokemons by type',
  })
  @ApiQuery({
    name: 'limit',
    required: true,
    type: Number,
    description: 'Number of pokemons to return per page',
  })
  @ApiQuery({
    name: 'offset',
    required: true,
    type: Number,
    description: 'Number of pokemons to skip',
  })
  @ApiResponse({
    status: 200,
    description: 'pokemons',
    type: PokemonStatisticResponse,
  })
  async getSatistics(@Query() getPokemonDto: GetPokemonDto): Promise<PokemonStatisticResponse> {
    const pokemonQuery = (
      await this.pokemonService.createQueryBuilder('pokemon')
    ).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId'
    ) as SelectQueryBuilder<PokemonStatistic>;

    pokemonQuery.addSelect(`
      CASE
        WHEN statistic.smash IS NULL AND statistic.pass IS NULL THEN 0
        ELSE statistic.smash + statistic.pass
      END
    `, 'raiting');

    pokemonQuery.orderBy('raiting', 'DESC');


    if (getPokemonDto.name) {
      pokemonQuery.where('pokemon.name ILIKE :name', { name: `%${getPokemonDto.name}%` });
    }

    if (getPokemonDto.types && Array.isArray(getPokemonDto.types) && getPokemonDto.types.length) {
      pokemonQuery.where('pokemon.types && :types', { types: getPokemonDto.types });
    }

    
    pokemonQuery.skip(getPokemonDto.offset).take(getPokemonDto.limit);

    const [pokemons, itemCount] = await pokemonQuery.getManyAndCount();
    const pageCount = Math.ceil(itemCount / getPokemonDto.limit);
    const page = Math.floor(getPokemonDto.offset / getPokemonDto.limit) + 1;
    const prev = page > 1;
    const next = page < pageCount;

    const response = {
      pokemons,
      offset: getPokemonDto.offset,
      limit: getPokemonDto.limit,
      itemCount,
      page,
      pageCount,
      prev,
      next,
    };

    return this.wrapSuccess({ response });
  }

  @Get('/:pokemonId')
  @ApiOperation({ summary: 'Get statistic' })
  @ApiParam({
    name: 'pokemonId',
    type: String,
    description: 'Pokemon ID',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'pokemon statistic',
    type: StatisticResponse,
  })
  async getStatistic(@Param() getStatisticDto: { pokemonId: string }): Promise<StatisticResponse> {
    const statistic = await this.statisticPokemonService.findOne({
      where: { pokemonId: Number(getStatisticDto.pokemonId) },
    });
    return this.wrapSuccess({ statistic });
  }
  
  @Post('/action')
  @ApiOperation({ summary: 'Create statistic' })
  @ApiBody({ type: ActionPokemonDto })
  @ApiResponse({
    status: 200,
    description: 'Create statistic',
    type: BaseResponse,
  })
  async actionPokemonStatistic(
    @Body()
    actionPokemonStatisticDto: {
      pokemonId: number;
      action: 'pass' | 'smash';
    }
  ): Promise<BaseResponse> {
    const existedStatistic = await this.statisticPokemonService.findOne({
      where: { pokemonId: actionPokemonStatisticDto.pokemonId },
    });

    if (!existedStatistic) {
      await this.statisticPokemonService.insert({
        pokemonId: actionPokemonStatisticDto.pokemonId,
        pass: 0,
        smash: 0,
        [actionPokemonStatisticDto.action]: 1,
      });

      return this.wrapSuccess();
    } else {
      await this.statisticPokemonService.save({
        ...existedStatistic,
        [actionPokemonStatisticDto.action]: existedStatistic[actionPokemonStatisticDto.action] + 1,
      });

      return this.wrapSuccess();
    }
  }
}
