import { Sushi } from './entity/sushi.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Sushi)
export class SushiRepository extends Repository<Sushi> {}
