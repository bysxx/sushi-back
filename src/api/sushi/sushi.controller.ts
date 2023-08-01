import { Body, JsonController, Post } from "routing-controllers";
import { CreateSushiDTO } from "./dto/create-sushi.dto";
import { SushiService } from "./sushi.service";

@JsonController("/sushi")
export class SushiController {
	constructor(
		private readonly sushiService: SushiService
	) { }

	@Post()
	public async create(@Body() body: CreateSushiDTO) {
		return await this.sushiService.create(body);
	}
}	