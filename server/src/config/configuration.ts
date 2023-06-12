import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { JwtModuleOptions } from "@nestjs/jwt";

interface INestConfig {
  port: number;
  clientUrl: string;
  database: TypeOrmModuleOptions;
  redis: {
    host: string;
    port: number;
    ttl: number;
  };
  jwtConfig: JwtModuleOptions;
  weather: { apiUrl: string; apiKey: string };
  locationLimit: number;
}

export default (): INestConfig => ({
  port: parseInt(process.env.PORT, 10) ?? 9000,
  clientUrl: process.env.FRONT_APP_URL,
  database: {
    type: process.env.DB_CONNECTION as "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) ?? 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // entities: ['dist/**/*.entity{.ts,.js}'],
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === "development",
    migrationsRun: true,
    migrations: ["dist/**/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations",
    logging: process.env.NODE_ENV === "development",
    cache: true,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) ?? 6379,
    ttl: 5,
  },
  jwtConfig: {
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: "1d" },
  },
  weather: {
    apiUrl: process.env.WEATHER_API_URL,
    apiKey: process.env.WEATHER_API_KEY,
  },
  locationLimit: parseInt(process.env.LOCATION_PER_USER_LIMIT, 10),
});
