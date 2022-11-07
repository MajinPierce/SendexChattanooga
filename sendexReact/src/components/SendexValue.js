import React from "react";
import { Box, Stack, Typography } from "@mui/material";

export default function SendexValue(props) {
  const [sendexValues, setSendexValues] = React.useState([0, 0, 0]);

  React.useEffect(() => {
    if (props.apiResponse.weather !== undefined) {
      setSendexValues(calculateSendex(props.apiResponse.weather.daily));
    }
  }, [props.apiResponse]);

  function calculateSendex(dailyWeather) {
    return dailyWeather.map((el) =>
      Math.round(2 * el.dew_point + el.humidity - el.temp.min)
    );
  }

  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      spacing={2}
      sx={{
        width: 1,
      }}
    >
      <Box
        component="span"
        sx={{ p: 2, border: "1px solid white", width: "33%" }}
      >
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h4">{"Today"}</Typography>
          <Typography variant="h3">{sendexValues[0]}</Typography>
        </Stack>
      </Box>
      <Box sx={{ p: 2, border: "1px solid white" }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h4">{"Tomorrow"}</Typography>
          <Typography variant="h3">{sendexValues[1]}</Typography>
        </Stack>
      </Box>
      <Box sx={{ p: 2, border: "1px solid white" }}>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Typography variant="h4">{"2morrow"}</Typography>
          <Typography variant="h3">{sendexValues[2]}</Typography>
        </Stack>
      </Box>
    </Stack>
  );
}
