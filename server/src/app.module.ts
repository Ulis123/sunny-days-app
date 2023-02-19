import { Module, CacheModule } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as redisStore from "cache-manager-redis-store";

import configuration from "src/config/configuration";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";
import { LocationsModule } from "src/locations/locations.module";

@Module({
  imports: [
    // CacheModule.registerAsync is not working. Error with CacheInterceptor
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10) ?? 6379,
      ttl: 5,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => await configService.get("database"),
    }),
    UsersModule,
    AuthModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
