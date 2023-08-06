import { Authorized, Get, JsonController } from 'routing-controllers';

@JsonController('/test')
export class TestController {
  @Get()
  public test() {
    return 'cicd good !';
  }

  @Authorized()
  @Get('/auth')
  public authTest() {
    return 'auth good';
  }
}
