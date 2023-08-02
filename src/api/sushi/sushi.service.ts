import { BaseException } from "exceptions/base.exception";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { SushiRepository } from "./sushi.repository";
import { CreateSushiDTO } from "./dto/create-sushi.dto";

@Service()
export class SushiService {
	constructor(
    @InjectRepository()
    private readonly sushiRepo: SushiRepository,
	) {}

	public async getAllSushi() {
		try {
			return await this.sushiRepo.find();
		} catch (e) {
			throw new BaseException(400, "get list error", e);
		}
	}

	public async getSushiById(id: number) {
		try {
			return await this.sushiRepo.findOne(id);
		} catch (e) {
			throw new BaseException(400, "create error", e);
		}
	}

	public async deleteSushiById(id: number) {
		try {
			return await this.sushiRepo.delete(id);
		} catch (e) {
			throw new BaseException(400, "create error", e);
		}
	}

	public async create(createSushiDTO: CreateSushiDTO) {
		try {
			await this.sushiRepo.save(createSushiDTO);
		} catch (e) {
			throw new BaseException(400, "create error", e);
		}
	}
}
