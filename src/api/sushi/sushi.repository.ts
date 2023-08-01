import { EntityRepository, Repository } from "typeorm";
import { Sushi } from "./entity/sushi.entity";

@EntityRepository(Sushi)
export class SushiRepository extends Repository<Sushi> {

}