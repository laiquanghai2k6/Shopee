import { Module } from '@nestjs/common';
import { HistoryCartController } from './history_cart.controller';
import { HistoryCartService } from './history_cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryCart } from 'src/entities/history_cart.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { User } from 'src/entities/user.entity';
import { History } from 'src/entities/history.entity';
import { Vouncher } from 'src/entities/vouncher.entity';
import { UserVouncher } from 'src/entities/user_vouncher';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UserCart } from 'src/entities/user_cart.entity';

@Module({
  controllers: [HistoryCartController],
  providers: [HistoryCartService,AuthService,JwtAuthGuard],
  imports:[
    TypeOrmModule.forFeature([HistoryCart,User,UserCart,History,Vouncher,UserVouncher]),
    AuthModule,
    CloudinaryModule
  ],
  exports:[HistoryCartService]
})
export class HistoryCartModule {}
