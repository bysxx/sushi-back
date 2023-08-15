import { BaseException } from 'exceptions/base.exception';
import { Service } from 'typedi';
import { SushiRepository } from './sushi.repository';
import Sushi, { SushiReview } from './sushi.model';

@Service()
export class SushiService {
  constructor(private readonly sushiRepo: SushiRepository) {}

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
      return await this.sushiRepo.model.findByIdAndDelete(id);
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

  public async createReview(id: string, review: SushiReview) {
    try {
      const sushi = await this.sushiRepo.model.findOne({ _id: id });

      if (!sushi) {
        throw new Error('sushi not found');
      }

      sushi.starsAvg = (sushi.starsAvg * sushi.reviews.length + review.star) / (sushi.reviews.length + 1);
      sushi.reviews.push(review);
      await sushi.save();
    } catch (e) {
      throw new BaseException(400, 'create review error', e);
    }
  }
}
