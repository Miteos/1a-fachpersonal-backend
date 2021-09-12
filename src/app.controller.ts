import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  sendMail(): any {
    return this.appService.example();
  }

  @Get('template')
  sendTemplate(): any {
    return this.appService.example2();
  }
}
