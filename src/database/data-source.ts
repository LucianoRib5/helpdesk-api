import { DataSource } from 'typeorm';
import { databaseConfig } from './database-config';

export const appDataSource = new DataSource(databaseConfig);
