import { Service } from 'typedi';
import Sushi, { SushiMenu, SushiReview } from './sushi.model';
import { Model, model, Schema } from 'mongoose';

@Service()
export class SushiRepository {
  constructor() {
    const reviewSchema = new Schema<SushiReview>({
      star: { type: Number, required: true },
      contents: { type: String, required: true },
    });

    const menuSchema = new Schema<SushiMenu>({
      name: { type: String, required: true },
      price: { type: Number, required: true },
    });

    const schema = new Schema<Sushi>({
      name: { type: String, required: true },
      location: { type: String, required: true },
      phone: { type: String, required: true },
      starsAvg: { type: Number, default: 0 },
      reviews: { type: [reviewSchema], default: [] },
      menus: { type: [menuSchema], default: [] },
    });

    this.model = model<Sushi>('Sushi', schema);
  }

  public model: Model<Sushi>;
}
