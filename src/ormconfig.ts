import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'medium_clone',
  password: '123',
  database: 'medium_clone',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
