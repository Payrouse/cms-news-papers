import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      name: process.env.POSTGRES_DB_NAME,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
    },
    typeorm: {
      type: process.env.TYPEORM_CONNECTION,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      logging: process.env.TYPEORM_LOGGING,
    },
    apiKey: process.env.API_KEY,
  };
});
