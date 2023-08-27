import { BaseException } from 'exceptions/base.exception';
import { Service } from 'typedi';
import { sign } from 'jsonwebtoken';
import { CheckDuplicateBody, LoginBody, SignupBody } from './auth.interfaces';
import { AuthRepository } from './auth.repository';

@Service()
export class AuthService {
  constructor(private readonly authRepo: AuthRepository) {}

  public async login(body: LoginBody) {
    try {
      const userInfo = await this.authRepo.model.findOne(body);
      const token = sign(
        {
          id: userInfo.id,
        },
        'tmp',
        { expiresIn: '1d', issuer: 'back' },
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

  public async checkDuplicateEmail(body: CheckDuplicateBody) {
    const existingUser = await this.authRepo.model.findOne({ email: body.email });
    return { isExist: existingUser ? true : false };
  }

  public async getUserData(userId: string) {
    const userInfo = await this.authRepo.model.findOne({ _id: userId });

    return userInfo.toJSON();
  }

  public async deleteUser(userId: string) {
    try {
      await this.authRepo.model.deleteOne({ _id: userId });

      return { message: '회원 탈퇴가 완료되었습니다.' };
    } catch (e) {
      throw new BaseException(500, '회원 탈퇴 중 에러 발생', e);
    }
  }
}
