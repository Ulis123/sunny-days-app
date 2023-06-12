import { Module } from "@nestjs/common";
import { ThrottlerModule } from "@nestjs/throttler";

import { ConfigModule } from "./config/config.module";
import { CacheModule } from "./cache/cache.module";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "src/users/users.module";
import { AuthModule } from "src/auth/auth.module";
import { LocationsModule } from "src/locations/locations.module";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ConfigModule,
    CacheModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
