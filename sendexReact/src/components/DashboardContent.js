import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import DailyWeatherChart from "./DailyWeatherChart";

export default function DashboardContent(props) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <Typography variant="h5" component="div" align="center">
          {props.name}
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          <DailyWeatherChart apiResponse={props.apiResponse} />
        </Grid>
      </Grid>
    </Grid>
  );
}
