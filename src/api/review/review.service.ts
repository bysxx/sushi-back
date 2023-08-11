import { SushiRepository } from 'api/sushi/sushi.repository';
import { BaseException } from 'exceptions/base.exception';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CreateReviewDTO } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';

@Service()
export class ReviewService {
  constructor(
    @InjectRepository()
    private readonly reviewRepo: ReviewRepository,

    @InjectRepository()
    private readonly sushiRepo: SushiRepository,
  ) {}

  public async create(createReviewDTO: CreateReviewDTO) {
    try {
      const data = await this.reviewRepo.save(createReviewDTO);

      // Find the sushi object using sushiId
      const sushi = await this.sushiRepo.findOne(createReviewDTO.sushiId);

      if (sushi) {
        // Add the review's id to the reviews array of the sushi object
        sushi.reviews.push(data.id);

        // Save the modified sushi object back to the database
        await this.sushiRepo.save(sushi);
      } else {
        throw new BaseException(404, 'Sushi not found', new Error('Sushi not found'));
      }
    } catch (e) {
      throw new BaseException(400, 'create error', e);
    }
  }
}
