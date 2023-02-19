import { IsLatitude, IsLongitude, IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  place_id: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @IsNotEmpty()
  @IsLongitude()
  lon: string;
}
