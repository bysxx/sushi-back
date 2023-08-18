import { Authorized, Body, Get, JsonController, Post } from 'routing-controllers';
import { CheckDuplicateBody, LoginBody, SignupBody } from './auth.interfaces';
import { AuthService } from './auth.service';

@JsonController('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  public async login(@Body() body: LoginBody) {
    return await this.authService.login(body);
  }

  @Post('/signup')
  public async signup(@Body() body: SignupBody) {
    await this.authService.signup(body);

    return { message: 'success' };
  }

  @Post('/check-duplicate')
  public async checkDuplicate(@Body() body: CheckDuplicateBody) {
    return await this.authService.checkDuplicateEmail(body);
  }

  @Get('/test')
  @Authorized()
  public test() {
    return 'good';
  }
}
