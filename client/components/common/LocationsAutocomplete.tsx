import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import { useSnackbar } from "notistack";
import parse from "autosuggest-highlight/parse";
import { Autocomplete, Box, Button, Grid, Stack, Theme, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";

import StyledTextField from "./StyledTextField";
import useGoogleLocationServices from "hooks/useGoogleLocationServices";
import { useLocationContext } from "contexts/locationContext";
import { ErrorAxiosResponse } from "types";

export const wrapper: SxProps<Theme> = { maxWidth: "700px", margin: "0 auto" };
export const autocomplete: SxProps<Theme> = { flex: 1 };
export const iconWrapper: SxProps<Theme> = { display: "flex", width: 44 };
export const locationWrapper: SxProps<Theme> = { width: "calc(100% - 44px)", wordWrap: "break-word" };

const LocationsAutocomplete = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [value, setValue] = useState<google.maps.places.AutocompletePrediction | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly google.maps.places.AutocompletePrediction[]>([]);

  const { addNewLocation } = useLocationContext();

  const { fetchAutocomplete, fetchPlace } = useGoogleLocationServices();

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
    } else {
      fetchAutocomplete({ input: inputValue }, (results?: readonly google.maps.places.AutocompletePrediction[]) => {
        if (active) {
          setOptions([...(value ? [value] : []), ...(results ? results : [])]);
        }
      });
    }

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchAutocomplete]);

  const handleSaveLocationBtnClick = () => {
    if (value) {
      fetchPlace({ placeId: value.place_id }, async (result: google.maps.places.PlaceResult) => {
        try {
          if (result.geometry) {
            await addNewLocation({
              place_id: value.place_id,
              city: value.description,
              lat: result.geometry.location!.lat(),
              lon: result.geometry.location!.lng(),
            });
            enqueueSnackbar("Location successfully created", { variant: "success" });
          }
        } catch (e) {
          if (e instanceof AxiosError<ErrorAxiosResponse>) {
            enqueueSnackbar(e.response?.data.message, { variant: "error" });
          }
        }
      });
    }
  };

  return (
    <Box sx={wrapper}>
      <Typography fontWeight={700} gutterBottom>
        Enter the location
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Autocomplete
          sx={autocomplete}
          autoComplete
          getOptionLabel={option => (typeof option === "string" ? option : option.description)}
          filterOptions={x => x}
          includeInputInList
          filterSelectedOptions
          noOptionsText="No locations"
          value={value}
          options={options}
          onChange={(_, value) => {
            setOptions(value ? [value, ...options] : options);
            setValue(value);
          }}
          onInputChange={(_, value) => {
            setInputValue(value);
          }}
          renderInput={params => <StyledTextField {...params} />}
          renderOption={(props, option) => {
            const matches = option.structured_formatting.main_text_matched_substrings || [];
            const parts = parse(
              option.structured_formatting.main_text,
              matches.map(match => [match.offset, match.offset + match.length]),
            );

            return (
              <li {...props}>
                <Grid container alignItems="center">
                  <Grid item sx={iconWrapper}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid>
                  <Grid item sx={locationWrapper}>
                    {parts.map(part => {
                      return (
                        <Box key={part.text} component="span" sx={{ fontWeight: part.highlight ? "bold" : "regular" }}>
                          {part.text}
                        </Box>
                      );
                    })}
                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />

        <Button variant="contained" onClick={handleSaveLocationBtnClick}>
          Save Location
        </Button>
      </Stack>
    </Box>
  );
};
export default LocationsAutocomplete;
