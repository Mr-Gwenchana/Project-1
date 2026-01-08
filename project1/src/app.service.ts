import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  starting(): string {
    return 'Welcome to my project !';
  }
}
