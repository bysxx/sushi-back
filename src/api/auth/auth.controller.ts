import { Authorized, Body, Delete, Get, JsonController, Post, Req } from 'routing-controllers';
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

  @Get('/user-data')
  @Authorized()
  public async getUserData(@Req() req) {
    return await this.authService.getUserData(req.user.id);
  }

  @Delete('/user')
  @Authorized()
  public async deleteUser(@Req() req) {
    return await this.authService.deleteUser(req.user.id);
  }
}
