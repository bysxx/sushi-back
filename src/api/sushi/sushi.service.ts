import { BaseException } from "exceptions/base.exception";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SushiRepository } from "./sushi.repository";
import { CreateSushiDTO } from "./dto/create-sushi.dto";

@Service()
export class SushiService {
	constructor(
		@InjectRepository()
		private readonly sushiRepo: SushiRepository
	) {}

	public async create(createSushiDTO: CreateSushiDTO) {
		try {
			await this.sushiRepo.save(createSushiDTO);
		} catch (e) {
			throw new BaseException(400, "create error", e);
		}
	}
}