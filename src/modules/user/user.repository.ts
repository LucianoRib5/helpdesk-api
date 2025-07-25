import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { DATABASE_TOKENS } from 'src/common/constants/database-tokens';

@Injectable()
export class UserRepository {
  constructor(
    @Inject(DATABASE_TOKENS.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByMultipleParams(
    filters: { key: keyof User; value: User[keyof User] }[],
  ): Promise<User | null> {
    const whereConditions = filters.map(({ key, value }) => ({ [key]: value }));
    return this.userRepository.findOne({ where: whereConditions });
  }
}
