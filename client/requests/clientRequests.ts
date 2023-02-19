import axios from "axios";

import { ILocation, ILocationWithWeather, ISignUpFormValues, ISignUpResponse } from "types";

// This service makes requests to next.js api folder
export default {
  signUp: async (body: ISignUpFormValues) => {
    const { data } = await axios.post<ISignUpResponse>(`/api/auth/signup`, body);
    return data;
  },
  createLocation: async (body: Omit<ILocation, "id">) => {
    const { data } = await axios.post<ILocationWithWeather>(`/api/locations`, body);
    return data;
  },
  getAllLocations: async () => {
    const { data } = await axios.get<ILocationWithWeather[]>(`/api/locations`);
    return data;
  },
  deleteLocation: async (id: number) => {
    const { data } = await axios.delete<ILocation>(`/api/locations/${id}`);
    return data;
  },
};
