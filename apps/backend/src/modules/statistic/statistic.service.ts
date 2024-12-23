import { BaseService } from '@/shared';
import { Injectable } from '@nestjs/common';
import { Statistic } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatisticService extends BaseService<Statistic> {
  constructor(
    @InjectRepository(Statistic)
    private readonly StatisticRepository: Repository<Statistic>
  ) {
    super(StatisticRepository);
  }
}
