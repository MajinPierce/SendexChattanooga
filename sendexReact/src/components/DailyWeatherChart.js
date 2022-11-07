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
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="dt" tickFormatter={formatDate} />
      <YAxis />
      <Tooltip offset={50} allowEscapeViewBox={{ x: false, y: true }} />
      <Legend />
      <Line
        name="Max Temp"
        unit="F"
        type="monotone"
        dataKey="temp.max"
        stroke="#C10B29"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Min Temp"
        unit="F"
        type="monotone"
        dataKey="temp.min"
        stroke="#456990"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Humidity"
        unit="%"
        type="monotone"
        dataKey="humidity"
        stroke="#A882DD"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Cloud Cover"
        unit="%"
        type="monotone"
        dataKey="clouds"
        stroke="#ADADAD"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Precipitation Chance"
        unit="%"
        type="monotone"
        dataKey="pop"
        stroke="#607744"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Precipitation Intensity"
        unit="mm/hr"
        type="monotone"
        dataKey="rain"
        stroke="#C7EF00"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Humidity"
        unit="%"
        type="monotone"
        dataKey="humidity"
        stroke="#AB00B8"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Dew Point"
        type="monotone"
        dataKey="dew_point"
        stroke="#684A52"
        activeDot={{ r: 5 }}
      />
      <Line
        name="Wind Speed"
        unit="mph"
        type="monotone"
        dataKey="wind_speed"
        stroke="#F45B69"
        activeDot={{ r: 5 }}
      />
    </LineChart>
  );
}
