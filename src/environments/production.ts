import { AppConfig } from 'src/app/models/app-config.model';

export const config: AppConfig = {
  envName: 'Production',
  production: true,
  apiPath: '/api',
  apiProtocol: 'https',
  applicationUrl: 'https://www.angular4dummies.com',
  applicationServer: 'angular4dummies',
  applicationProtocol: 'https',
  musicApiPrefix: 'http://localhost:3001'
}