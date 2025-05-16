import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { configValidationSchema } from './schema.config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { PublicGuard } from './auth/guard/public.guard';
import { RefreshTokenMiddlewares } from './auth/middlewares/refreshToken.middlewares';
import { CloudinaryController } from './cloudinary/cloudinary.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { UserCart } from './entities/user_cart.entity';
import { Products } from './entities/products.entity';
import { ProductResponse } from './entities/product_response.entity';
import { Address } from './entities/address.entity';
import { Detail } from './entities/detail.entity';
import { Option } from './entities/option.entity';
import { ProductOptions } from './entities/product_options.entity';
import { Category } from './entities/category.entity';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { Vouncher } from './entities/vouncher.entity';
import { VouncherController } from './vouncher/vouncher.controller';
import { VouncherModule } from './vouncher/vouncher.module';
import { History } from './entities/history.entity';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { ProductModule } from './product/product.module';
import { ProductController } from './product/product.controller';
import { Banner } from './entities/banner.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema:configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {

          type: 'postgres',
          url: configService.get('PUBLIC_DATABASE_URL'),
          autoLoadEntities: true,
          synchronize: true,
          logging: 'all',
          logger: 'advanced-console',
        }
      }
    }),
    TypeOrmModule.forFeature([User,History,Banner,UserCart,Products,ProductResponse,Address,Detail,Option,ProductOptions,Category,Vouncher]),
    AuthModule,
    CloudinaryModule,
    CategoryModule,
    VouncherModule,
    AdminModule,
    ProductModule,
    
  ],
  controllers: [AuthController,ProductController, CloudinaryController, CategoryController,VouncherController,AdminController],
  providers:[
    JwtAuthGuard,
    {
      provide:APP_GUARD,
      useClass:PublicGuard
    }
  ]
  
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
    consumer
      .apply(RefreshTokenMiddlewares)
      .forRoutes({path:'auth/sign-out-auto',method:RequestMethod.ALL})
  }
 }
