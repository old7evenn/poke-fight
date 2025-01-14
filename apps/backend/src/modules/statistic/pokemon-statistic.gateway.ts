import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PokemonStatistic } from './entities';
import { StatisticService } from './statistic.service';
import { PokemonService } from '../pokemon';
import { SelectQueryBuilder } from 'typeorm';

interface PaginationParams {
  offset: number;
  limit: number;
  name?: string;
  types?: string[];
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class PokemonStatisticGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();
  private clientFilters: Map<string, PaginationParams> = new Map();
  private updateInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly statisticService: StatisticService,
    private readonly pokemonService: PokemonService
  ) {}

  handleConnection(client: Socket) {
    this.connectedClients.set(client.id, client);
    this.clientFilters.set(client.id, { offset: 0, limit: 10 });
    this.sendInitialData(client);
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedClients.delete(client.id);
    this.clientFilters.delete(client.id);
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('loadMore')
  async handleLoadMore(client: Socket, params: PaginationParams) {
    const currentFilters = this.clientFilters.get(client.id) || { offset: 0, limit: 10 };
    const newLimit = params.limit || currentFilters.limit;

    console.log(`Loading more with limit: ${newLimit}`);

    const newFilters = {
      ...currentFilters,
      offset: 0,
      limit: newLimit,
    };

    this.clientFilters.set(client.id, newFilters);
    await this.sendPaginatedData(client.id);
  }

  @SubscribeMessage('updateFilters')
  async handleFilterUpdate(client: Socket, filters: Partial<PaginationParams>) {
    const currentFilters = this.clientFilters.get(client.id) || { offset: 0, limit: 10 };
    const newFilters = {
      ...currentFilters,
      ...filters,
      offset: 0,
      limit: 10,
    };
    this.clientFilters.set(client.id, newFilters);
    await this.sendPaginatedData(client.id);
  }

  private async createBaseQuery(): Promise<SelectQueryBuilder<PokemonStatistic>> {
    const pokemonQuery = (
      await this.pokemonService.createQueryBuilder('pokemon')
    ).leftJoinAndMapOne(
      'pokemon.statistic',
      'statistic',
      'statistic',
      'statistic.pokemonId = pokemon.pokemonId'
    ) as SelectQueryBuilder<PokemonStatistic>;

    pokemonQuery.addSelect(
      `CASE
         WHEN statistic.smash IS NULL AND statistic.pass IS NULL THEN 0
         ELSE statistic.smash + statistic.pass
       END`,
      'rating'
    );

    pokemonQuery.orderBy('rating', 'DESC').addOrderBy('pokemon.pokemonId', 'ASC');

    return pokemonQuery;
  }

  private async sendInitialData(client: Socket) {
    await this.sendPaginatedData(client.id);
  }

  private async sendPaginatedData(clientId: string) {
    const client = this.connectedClients.get(clientId);
    const filters = this.clientFilters.get(clientId);

    if (!client || !filters) return;

    const query = await this.createBaseQuery();

    query.offset(0).take(filters.limit);

    try {
      const [pokemons, itemCount] = await query.getManyAndCount();
      const basePageSize = 10;
      const currentPage = Math.floor(pokemons.length / basePageSize);
      const pageCount = Math.ceil(itemCount / basePageSize);

      client.emit('statisticsUpdate', {
        pokemons,
        offset: 0,
        limit: filters.limit,
        itemCount,
        page: currentPage,
        pageCount,
        prev: currentPage > 0,
        next: pokemons.length < itemCount,
      });
    } catch (error) {
      console.error(`Error fetching paginated data for client ${clientId}:`, error);
      client.emit('error', { message: 'Failed to fetch data' });
    }
  }

  async broadcastStatisticUpdate() {
    console.log('Broadcasting updated statistics...');
    for (const clientId of this.connectedClients.keys()) {
      if (this.updateInterval) return;

      this.updateInterval = setInterval(async () => {
        for (const clientId of this.connectedClients.keys()) {
          try {
            await this.sendPaginatedData(clientId);
          } catch (error) {
            console.error(`Error updating statistics for client ${clientId}:`, error);
          }
        }
      }, 300);
    }
  }
}
