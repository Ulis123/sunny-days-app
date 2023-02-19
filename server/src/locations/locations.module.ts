import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService, ConfigModule } from "@nestjs/config";

import { Location } from "./entities/location.entity";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Location]),
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get("weather.apiUrl"),
        params: { appid: configService.get("weather.apiKey"), exclude: "minutely,hourly" },
      }),
    }),
  ],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
