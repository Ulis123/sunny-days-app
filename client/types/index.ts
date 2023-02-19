export enum AppPages {
  HOME = "/",
  SIGN_IN = "/signin",
  SIGN_UP = "/signup",
  NOT_FOUND = "/404",
}

export interface IUserInfo {
  id: string;
  email: string;
  password?: string;
}

export interface ISignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
}
export interface ISignUpResponse {
  message: string;
}
export interface ILoginFormValues {
  email: string;
  password: string;
}
export interface ILoginResponse extends IUserInfo {
  token: string;
}

export interface ICurrentWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface IHourlyWeather {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  pop: number;
}

export interface IDailyWeather {
  dt: number;
  sunrise: number;
  sunset: number;
  uvi: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: number;
  pop: number;
}

export interface IWeatherOneCall {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: ICurrentWeather;
  hourly: IHourlyWeather[];
  daily: IDailyWeather[];
}

export interface ILocation {
  id: number;
  place_id: string;
  city: string;
  lat: number;
  lon: number;
}

export interface ILocationWithWeather extends ILocation {
  weather: IWeatherOneCall;
}

export interface ErrorAxiosResponse {
  error: string;
  message: string;
  statusCode: number;
}
