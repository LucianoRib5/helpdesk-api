import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { DATABASE_TOKENS } from 'src/common/constants/database-tokens';

export const userProviders = [
  {
    provide: DATABASE_TOKENS.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATABASE_TOKENS.DATA_SOURCE],
  },
];
