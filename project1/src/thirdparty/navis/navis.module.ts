import { Module } from '@nestjs/common';
import { NavisAuthService } from './navis-auth/navis-auth.service';
import { NavisClientService } from './navis-client/navis-client.service';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [CacheModule.register(),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        baseURL: config.get<string>('NAVIS_BASE_URL'),
        timeout: config.get<number>('NAVIS_REQ_TIMEOUT_MS')
      }),
    }),
  ],
  providers: [NavisAuthService, NavisClientService],
  exports: [NavisClientService],
})
export class NavisModule {}
