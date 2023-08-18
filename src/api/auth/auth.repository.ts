import { Service } from 'typedi';
import { Model, model, Schema } from 'mongoose';
import User from './auth.interfaces';

@Service()
export class AuthRepository {
  constructor() {
    const schema = new Schema<User>({
      email: { type: String, required: true, unique: true, index: true },
      password: { type: String, required: true, idnex: true },
      name: { type: String, required: true },
      location: { type: String, required: true },
      age: { type: Number, required: true },
      bookmarks: { type: [], default: [] },
      reviews: { type: [], default: [] },
    });

    this.model = model<User>('User', schema);
  }

  public model: Model<User>;
}
