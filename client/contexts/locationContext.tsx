import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from "react";

import { clientRequests } from "requests";
import { ICurrentWeather, IDailyWeather, IHourlyWeather, ILocation, ILocationWithWeather } from "types";

interface ILocationContextState {
  locations: ILocationWithWeather[];
  loading: boolean;
  status: Statuses;
}
interface ILocationContextDispatch {
  getLocations: (initialLocations?: ILocationWithWeather[]) => void;
  addNewLocation: (location: Omit<ILocation, "id">) => Promise<void>;
  removeLocation: (id: number) => Promise<void>;
}

type Statuses = "creating" | "deleting" | "pending" | "fetching";

const LocationContextState = createContext<ILocationContextState>({
  locations: [],
  loading: false,
  status: "pending",
});
const LocationContextDispatch = createContext<ILocationContextDispatch>({
  getLocations: async () => {},
  addNewLocation: async () => {},
  removeLocation: async () => {},
});

const LocationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [locations, setLocations] = useState<ILocationWithWeather[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Statuses>("pending");

  const getLocations = useCallback(
    async (initialLocations?: ILocationWithWeather[]) => {
      if (status === "pending") {
        if (initialLocations) {
          setLocations(initialLocations);
        } else {
          setStatus("fetching");
          setLoading(true);

          try {
            const l = await clientRequests.getAllLocations();
            setLocations(l);
          } catch (e) {
            throw e;
          } finally {
            setStatus("pending");
            setLoading(false);
          }
        }
      }
    },
    [status],
  );

  const addNewLocation = useCallback(async (location: Omit<ILocation, "id">) => {
    setStatus("creating");
    setLoading(true);

    try {
      const data = await clientRequests.createLocation(location);
      setLocations(prev => [...prev, data]);
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
      setStatus("pending");
    }
  }, []);

  const removeLocation = useCallback(async (id: number) => {
    setStatus("deleting");
    setLoading(true);

    const optimistiq = locations;
    setLocations(prev => prev.filter(loc => loc.id !== id));

    try {
      await clientRequests.deleteLocation(id);
    } catch (e) {
      setLocations(optimistiq);
      throw e;
    } finally {
      setLoading(false);
      setStatus("pending");
    }
  }, []);

  const value = { locations, loading, status, getLocations, addNewLocation, removeLocation };
  return (
    <LocationContextState.Provider value={value}>
      <LocationContextDispatch.Provider value={value}>{children}</LocationContextDispatch.Provider>
    </LocationContextState.Provider>
  );
};

const useLocationContext = () => {
  const state = useContext(LocationContextState);
  const dispatch = useContext(LocationContextDispatch);
  if (state === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return { ...state, ...dispatch };
};

export { LocationProvider, useLocationContext };
