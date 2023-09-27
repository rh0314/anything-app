import { AppConfig } from 'src/app/models/app-config.model';

export const config: AppConfig = {
  apiServer: 'localhost',
  apiProtocol: 'http',
  apiPath: '/api',
  apiPort: 2999,
  applicationProtocol: 'http',
  applicationServer: 'localhost:4200',
  musicApiPrefix: 'http://localhost:3001/musicapi'
}