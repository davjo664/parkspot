import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface RuntimeConfiguration {
  environment: 'dev' | 'prod';


  // exported firebase service account
  firebase: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
  }

  firebaseCMServerKey: string;
  firebaseCMSenderId: string;
  firebaseProjectId: string;

}

export interface DBConfig extends PostgresConnectionOptions {
  type: 'postgres';
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean,
}


export class PrkConfig {
  dbConfig: DBConfig;
  runtimeConfiguration: RuntimeConfiguration;
}


