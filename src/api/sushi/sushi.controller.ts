import {
	Body, Delete, Get, JsonController, Param, Post,
} from "routing-controllers";
import { CreateSushiDTO } from "./dto/create-sushi.dto";
import { SushiService } from "./sushi.service";

@JsonController("/sushi")
export class SushiController {
	constructor(
    private readonly sushiService: SushiService,
	) { }

  @Get()
	public async get() {
		return this.sushiService.getAllSushi();
	}

  @Get("/:id")
  public async getOne(@Param("id") id: number) {
  	return this.sushiService.getSushiById(id);
  }

  @Post()
  public async create(@Body() body: CreateSushiDTO) {
  	return this.sushiService.create(body);
  }

  @Delete("/:id")
  public async deleteOne(@Param("id") id: number) {
  	return this.sushiService.deleteSushiById(id);
  }
}
