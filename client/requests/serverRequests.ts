import serverAxios from "config/serverAxios";
import {
  ILocation,
  ILocationWithWeather,
  ILoginFormValues,
  ILoginResponse,
  ISignUpFormValues,
  ISignUpResponse,
} from "types";

// This service makes requests to nest.js api backend
export default {
  signUp: async (body: ISignUpFormValues) => {
    const { data } = await serverAxios.post<ISignUpResponse>(`/api/auth/signup`, body);
    return data;
  },
  signIn: async (body: ILoginFormValues) => {
    const { data } = await serverAxios.post<ILoginResponse>(`/api/auth/login`, body);
    return data;
  },
  createLocation: async (body: Omit<ILocation, "id">, token: string) => {
    const { data } = await serverAxios.post<ILocationWithWeather>(`/api/locations`, body, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  },
  getAllLocations: async (token: string) => {
    const { data } = await serverAxios.get<ILocationWithWeather[]>(`/api/locations/forecast`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  },
  deleteLocation: async (id: number, token: string) => {
    const { data } = await serverAxios.delete<ILocation>(`/api/locations/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return data;
  },
};
