import { Module } from '@nestjs/common';
import { ThirdpartyService } from './thirdparty.service';
import { NavisModule } from './navis/navis.module';

@Module({
  imports: [NavisModule],
  providers: [ThirdpartyService],
  exports: [ThirdpartyService],
})
export class ThirdpartyModule {}
