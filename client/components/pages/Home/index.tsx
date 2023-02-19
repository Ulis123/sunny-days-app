import { FC, useEffect, useMemo, useRef } from "react";

import { Box, Container, Grid, Typography } from "@mui/material";

import { LocationsAutocomplete, Header, WeatherCard } from "components/common";
import { useLocationContext } from "contexts/locationContext";
import { ILocationWithWeather } from "types";

interface HomeProps {
  locations?: ILocationWithWeather[];
}

const Home: FC<HomeProps> = ({ locations }) => {
  const { locations: locData, loading, status, getLocations } = useLocationContext();

  const isInitialized = useRef(false);
  useEffect(() => {
    if (locations && !isInitialized.current) {
      getLocations(locations);
      isInitialized.current = true;
    }
  }, [getLocations, locations]);

  useEffect(() => {
    const id = setInterval(async () => {
      try {
        await getLocations();
      } catch (e) {
        console.log(e);
      }
    }, 10 * 60 * 1000);

    return () => clearInterval(id);
  }, [getLocations]);

  const skeletonsCount = useMemo(() => {
    return new Array(locData.length + (status === "creating" ? 1 : 0)).fill(null);
  }, [locData.length, status]);

  return (
    <>
      <Header />
      <Box component="main" sx={{ py: "40px" }}>
        <Container>
          <Typography variant="h4" align="center" paragraph>
            Sunny Days App
          </Typography>
          <Typography variant="subtitle2" align="center" paragraph>
            You can choose only 10 locations
          </Typography>

          <LocationsAutocomplete />

          <Grid container spacing={2} sx={{ py: "40px" }}>
            {locData.map(location => (
              <Grid key={location.place_id} item xs={12} md={6} lg={4}>
                <WeatherCard location={location} loading={loading} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
