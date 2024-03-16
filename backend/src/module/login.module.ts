import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginController } from '../controllers/login.controller';
import { User } from '../models/user.entity';
import { userSchema } from '../schemas/user.schema';
import { ZodValidationMiddleware } from '../shared/middlewares/zod-validation.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [LoginController],
})
export class LoginModule implements NestModule {
  configure(builder: MiddlewareConsumer) {
    builder
      .apply(ZodValidationMiddleware(userSchema.omit({ id: true, name: true })))
      .forRoutes('login');
  }
}
