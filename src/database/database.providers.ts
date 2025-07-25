import { DataSource } from 'typeorm';
import { databaseConfig } from './database-config';
import { DATABASE_TOKENS } from 'src/common/constants/database-tokens';

export const databaseProviders = [
  {
    provide: DATABASE_TOKENS.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource(databaseConfig);
      return dataSource.initialize();
    },
  },
];
