import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function DailyWeatherChart(props) {
  const [dailyWeather, setDailyWeather] = React.useState([{}]);

  React.useEffect(() => {
    if (props.apiResponse.weather !== undefined) {
      setDailyWeather(props.apiResponse.weather.daily);
    }
  }, [props.apiResponse]);

  function formatDate(dt) {
    return new Date(dt * 1000).toLocaleDateString("en-us", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <LineChart
      data={dailyWeather}
      width={600}
      height={400}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dt" tickFormatter={formatDate} />
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
