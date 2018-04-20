import {createConnection} from 'typeorm';
import {PrkConfig} from '../config/config.model';

export const DbConnectionToken = 'DbConnectionToken';

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async (config: PrkConfig) => {

      /**
       * Stop TypeORM CLI from running in prod by removing this information. Otherwise the
       * cli is trying to import .ts sources (what breaks). Migrations are being run by antoher
       * task anyway.. */
      const {migrations, ...requiredDbCOnfig} = config.dbConfig;

      return await createConnection({
        ...requiredDbCOnfig,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
      });
    },
    inject: [PrkConfig],
  },
];
