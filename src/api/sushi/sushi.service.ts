import { BaseException } from 'exceptions/base.exception';
import { Service } from 'typedi';
import { SushiRepository } from './sushi.repository';
import Sushi, { CreateReviewBody } from './sushi.interfaces';
import { AuthRepository } from 'api/auth/auth.repository';

@Service()
export class SushiService {
  constructor(private readonly sushiRepo: SushiRepository, private readonly authRepo: AuthRepository) {}

  public async getAllSushi() {
    try {
      return await this.sushiRepo.model.find();
    } catch (e) {
      throw new BaseException(400, 'get list error', e);
    }
  }

  public async getSushiById(id: string) {
    try {
      return await this.sushiRepo.model.findOne({ _id: id });
    } catch (e) {
      throw new BaseException(400, 'create error', e);
    }
  }

  public async deleteSushiById(id: string) {
    try {
      await this.sushiRepo.model.findByIdAndDelete(id);
    } catch (e) {
      throw new BaseException(400, 'create error', e);
    }
  }

  public async create(sushi: Sushi) {
    try {
      await this.sushiRepo.model.create(sushi);
    } catch (e) {
      throw new BaseException(400, 'create error', e);
    }
  }

  public async createReview(body: CreateReviewBody, userId: string) {
    try {
      const sushi = await this.sushiRepo.model.findOne({ _id: body.sushiId });

      if (!sushi) {
        throw new Error('sushi not found');
      }

      sushi.starsAvg = (sushi.starsAvg * sushi.reviews.length + body.star) / (sushi.reviews.length + 1);
      sushi.reviews.push(body);

      const tasks = [];
      tasks.push(sushi.save());
      tasks.push(this.authRepo.model.updateOne({ _id: userId }, { $push: { reviews: sushi.id } }));
      await Promise.all(tasks);
    } catch (e) {
      throw new BaseException(400, 'create review error', e);
    }
  }
}
