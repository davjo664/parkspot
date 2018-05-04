import {createConnection} from 'typeorm';
import {PrkConfig} from '../config/config.model';

export const DbConnectionToken = 'DbConnectionToken';

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async (config: PrkConfig) => {
      return await createConnection({
        ...config.dbConfig,
        migrations: config.runtimeConfiguration.environment === 'prod' ? ['dist/migration/**/*.js'] : [],
        migrationsRun: config.runtimeConfiguration.environment === 'prod',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      });
    },
    inject: [PrkConfig],
  },
];
