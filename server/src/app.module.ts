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
import { ServiceModule } from './cloudinary/service/service.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

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
    TypeOrmModule.forFeature([User]),
    AuthModule,
    ServiceModule,
    CloudinaryModule
  ],
  controllers: [AuthController, CloudinaryController],
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
