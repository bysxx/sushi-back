import { Body, JsonController, Post } from 'routing-controllers';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewService } from './review.service';

@JsonController('/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  public async create(@Body() body: CreateReviewDTO) {
    return this.reviewService.create(body);
  }
}
