import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { User } from 'src/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Category } from 'src/entities/category.entity';
import { Banner } from 'src/entities/banner.entity';
import { Vouncher } from 'src/entities/vouncher.entity';
import { UserVouncher } from 'src/entities/user_vouncher';
import { History } from 'src/entities/history.entity';

@Module({
  controllers: [AdminController],
  providers: [AdminService,AuthService,JwtAuthGuard,RolesGuard,CloudinaryService],
  imports:[AuthModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([Products,User,Category,History,Banner,Vouncher,UserVouncher])
  ],
  exports:[AdminService]
})
export class AdminModule {}
