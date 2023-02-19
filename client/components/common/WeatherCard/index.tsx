import { FC } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { AxiosError } from "axios";

import { useSnackbar } from "notistack";
import { Box, Card, CardContent, CardHeader, Divider, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";

import { useLocationContext } from "contexts/locationContext";
import { cardContentImageWrapper, cardContentMain, daysStack, secondaryFieldsWrapper } from "./styles";
import { ErrorAxiosResponse, ILocationWithWeather, IWeatherOneCall } from "types";

const secondaryFields = (weather: IWeatherOneCall) => [
  { title: "Humidity", value: `${weather.current.humidity} %` },
  { title: "Pressure", value: `${weather.current.pressure} hPa` },
  { title: "Visibility", value: `${weather.current.visibility} m` },
  { title: "Wind speed", value: `${weather.current.wind_speed} metre/sec` },
];

interface WeatherCardProps {
  location: ILocationWithWeather;
  loading: boolean;
}
const WeatherCard: FC<WeatherCardProps> = ({ location, loading }) => {
  const { weather, city } = location;
  const { enqueueSnackbar } = useSnackbar();

  const { removeLocation } = useLocationContext();

  const handleDeleteButtonClick = async () => {
    try {
      await removeLocation(location.id);
      enqueueSnackbar("Location successfully removed", { variant: "success" });
    } catch (e) {
      if (e instanceof AxiosError<ErrorAxiosResponse>) {
        enqueueSnackbar(e.response?.data.message, { variant: "error" });
      }
    }
  };

  const iconInfo = weather.current.weather[0];
  const days = weather.daily.slice(1, 4);
  return (
    <Card>
      <CardHeader
        action={
          !loading && (
            <IconButton onClick={handleDeleteButtonClick}>
              <Delete />
            </IconButton>
          )
        }
        title={loading ? <Skeleton sx={{ maxWidth: "100px" }} /> : city}
        subheader={loading ? <Skeleton sx={{ maxWidth: "200px" }} /> : format(weather.current.dt * 1000, "PPpp")}
      />
      <CardContent>
        <Box sx={cardContentMain}>
          <Typography component="span" variant="h3">
            {loading ? <Skeleton sx={{ width: "60px" }} /> : <>{Math.round(weather.current.temp)} &#8451;</>}
          </Typography>
          <Box sx={cardContentImageWrapper}>
            {loading ? (
              <Skeleton variant="circular" sx={{ width: "60px", height: "60px", mb: "20px" }} />
            ) : (
              <Image
                src={`http://openweathermap.org/img/wn/${iconInfo.icon}@2x.png`}
                alt={iconInfo.main}
                width={80}
                height={80}
              />
            )}
            <Typography variant="body2" color="text.secondary">
              {loading ? <Skeleton sx={{ width: "100px" }} /> : iconInfo.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={secondaryFieldsWrapper}>
          {secondaryFields(weather).map(({ title, value }) => (
            <Box key={title} sx={{ p: "10px" }}>
              <Typography gutterBottom variant="body2" align="center">
                {loading ? <Skeleton sx={{ width: "65px" }} /> : title}
              </Typography>
              <Typography gutterBottom variant="subtitle1" align="center">
                {loading ? <Skeleton sx={{ width: "65px" }} /> : value}
              </Typography>
            </Box>
          ))}
        </Box>
        <Divider />
        <Box sx={secondaryFieldsWrapper}>
          {days.map(({ dt, weather, temp }) => {
            const dailyIconInfo = weather[0];
            return (
              <Stack key={dt} sx={daysStack}>
                <Typography variant="h5" align="center">
                  {loading ? <Skeleton sx={{ width: "85px" }} /> : format(dt * 1000, "LLL d")}
                </Typography>
                <Typography variant="h5" align="center">
                  {loading ? <Skeleton sx={{ width: "85px" }} /> : <>{Math.round(temp.eve)} &#8451;</>}
                </Typography>
                {loading ? (
                  <Skeleton variant="circular" sx={{ width: "70px", height: "70px" }} />
                ) : (
                  <Image
                    src={`http://openweathermap.org/img/wn/${dailyIconInfo.icon}@2x.png`}
                    alt={dailyIconInfo.main}
                    width={80}
                    height={80}
                  />
                )}

                <Typography variant="body2" align="center">
                  {loading ? <Skeleton sx={{ width: "85px" }} /> : dailyIconInfo.main}
                </Typography>
              </Stack>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
