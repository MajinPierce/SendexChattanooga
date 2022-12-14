import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

import DailyWeatherChart from "./DailyWeatherChart";
import SendexValue from "./SendexValue";

export default function DashboardContent(props) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      spacing={10}
    >
      <Grid item>
        <Typography variant="h2" component="div" align="center">
          {props.name}
        </Typography>
      </Grid>
      <Grid item>
        <SendexValue apiResponse={props.apiResponse} />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
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
