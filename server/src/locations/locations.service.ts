import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpService } from "@nestjs/axios";
import { AxiosError } from "axios";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { catchError, firstValueFrom, forkJoin, lastValueFrom, map, of, switchMap } from "rxjs";

import { CreateLocationDto } from "./dto/create-location.dto";
import { Location } from "./entities/location.entity";
import { User } from "src/users/entities/user.entity";
import { IWeatherOneCall } from "src/types";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private readonly locations: Repository<Location>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async create({ place_id, city, lat, lon }: CreateLocationDto, user: User) {
    const exists = user.locations.find(l => l.place_id === place_id);

    if (exists) {
      throw new BadRequestException("You already created this location");
    }

    const limit = this.configService.get("locationLimit");
    if (user.locations.length >= limit) {
      throw new BadRequestException(`You can't create more than ${limit} locations`);
    }

    const existingLocation = await this.locations.findOne({
      where: { place_id },
      relations: ["users"],
    });

    let loc: Location;

    if (existingLocation) {
      existingLocation.users = [...existingLocation.users, user];
      loc = existingLocation;
    } else {
      const location = this.locations.create({ place_id, city, lat: Number(lat), lon: Number(lon) });
      location.users = [user];
      loc = location;
    }

    const { users: _, ...rest } = await this.locations.save(loc);

    const { data } = await firstValueFrom(
      this.httpService.get<IWeatherOneCall>(`/onecall?lat=${loc.lat}&lon=${loc.lon}&units=metric`).pipe(
        catchError((error: AxiosError) => {
          throw new BadRequestException(error.response.data);
        }),
      ),
    );

    return { ...rest, weather: data };
  }

  async findAll(user: User) {
    return lastValueFrom(
      of(user.locations).pipe(
        switchMap(locations =>
          forkJoin(
            locations.map(location =>
              this.httpService
                .get<IWeatherOneCall>(`/onecall?lat=${location.lat}&lon=${location.lon}&units=metric`)
                .pipe(
                  map(({ data }) => ({ ...location, weather: data })),
                  catchError((error: AxiosError) => {
                    throw new BadRequestException(error.response.data);
                  }),
                ),
            ),
          ),
        ),
      ),
    );
  }

  async findOne(id: number) {
    return this.locations.findOne({ where: { id } });
  }

  async remove(id: number, user: User) {
    const location = await this.locations.findOne({ where: { id }, relations: ["users"] });

    location.users = location.users.filter(({ id }) => id !== user.id);

    return this.locations.save(location);
  }
}
