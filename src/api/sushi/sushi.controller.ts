import { Response } from 'express';
import { Body, Delete, Get, JsonController, Param, Post, Res } from 'routing-controllers';
import Sushi, { CreateReviewBody } from './sushi.interfaces';
import { SushiService } from './sushi.service';

@JsonController('/sushi')
export class SushiController {
  constructor(private readonly sushiService: SushiService) {}

  @Get()
  public async get(@Res() response: Response) {
    const data = await this.sushiService.getAllSushi();
    return response.send(data);
  }

  @Get('/:id')
  public async getOne(@Param('id') id: string, @Res() response: Response) {
    const data = await this.sushiService.getSushiById(id);
    return response.send(data);
  }

  @Post()
  public async create(@Body() body: Sushi) {
    return this.sushiService.create(body);
  }

  @Delete('/:id')
  public async deleteOne(@Param('id') id: string) {
    return this.sushiService.deleteSushiById(id);
  }

  @Post('/review')
  public async createReview(@Body() body: CreateReviewBody) {
    return this.sushiService.createReview(body);
  }
}
