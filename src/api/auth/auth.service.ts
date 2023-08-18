import { BaseException } from 'exceptions/base.exception';
import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { LoginBody, SignupBody } from './auth.interfaces';
import { AuthRepository } from './auth.repository';

@Service()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  public async login(body: LoginBody) {
    try {
      const userInfo = await this.authRepo.model.findOne(body);
      console.log(userInfo);
      const token = sign(
        {
          id: userInfo.id,
        },
        'tmp',
        { expiresIn: '10s', issuer: 'back' },
      );
      return { token: token, data: userInfo.toJSON() };
    } catch (e) {
      throw new BaseException(400, '토큰 발급 중 알 수 없는 에러 발생', e);
    }
  }

  public async signup(body: SignupBody) {
    try {
      await this.authRepo.model.create(body);
    } catch (e) {
      throw new BaseException(400, e.message, e);
    }
  }
}
