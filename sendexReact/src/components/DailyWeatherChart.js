import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DailyWeatherChart(props) {
  const [dailyWeather, setDailyWeather] = React.useState([{}]);

  /*
  React.useEffect(() => {
    setDailyWeather(props.apiResponse.weather.daily);
    //const dates = props.apiResponse.weather.dt.map((dt) => new Date(dt));
  }, [props]);
  */

  return (
    <LineChart
      width={600}
      height={400}
      data={dailyWeather}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dt" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="temp.day"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}
