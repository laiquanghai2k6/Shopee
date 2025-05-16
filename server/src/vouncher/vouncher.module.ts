import { Module } from '@nestjs/common';
import { VouncherService } from './vouncher.service';
import { VouncherController } from './vouncher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vouncher } from 'src/entities/vouncher.entity';

@Module({
  providers: [VouncherService],
  controllers:[VouncherController],
  imports:[
    TypeOrmModule.forFeature([Vouncher])
  ],
  exports:[VouncherService]
})
export class VouncherModule {}
