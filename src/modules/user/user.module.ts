import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { userProviders } from './user.provider';
import { UserRepository } from './user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [...userProviders, UserRepository, UserService],
  imports: [DatabaseModule],
  exports: [UserRepository],
})
export class UserModule {}
