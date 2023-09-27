import { AppConfig } from 'src/app/models/app-config.model';

export const config: AppConfig = {
  
  envName: 'localIIS',
  production: false,
  apiPath: '/api',
  apiProtocol: 'https',
  apiPort: 3000,
  applicationUrl: 'http://localhost',
  applicationServer: 'localhost',
  applicationProtocol: 'http',
  musicApiPrefix: 'http://localhost:3001'
}