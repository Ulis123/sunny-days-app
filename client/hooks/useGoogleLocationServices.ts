import { useEffect, useMemo, useRef } from "react";

import { debounce } from "@mui/material/utils";

const useGoogleLocationServices = () => {
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  const fetchAutocomplete = useMemo(
    () => debounce((request, callback) => autocompleteService.current?.getPlacePredictions(request, callback), 300),
    [],
  );
  const fetchPlace = useMemo(
    () => debounce((option, callback) => placesService.current?.getDetails(option, callback), 300),
    [],
  );

  useEffect(() => {
    if ((window as Window).google) {
      if (!autocompleteService.current) {
        autocompleteService.current = new window.google.maps.places.AutocompleteService();
      }
      if (!placesService.current) {
        placesService.current = new window.google.maps.places.PlacesService(document.createElement("div"));
      }
    }
  });

  return { autocompleteService, placesService, fetchAutocomplete, fetchPlace };
};

export default useGoogleLocationServices;
