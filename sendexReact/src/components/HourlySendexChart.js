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

export default function HourlySendexChart(props) {
  const [hourlySendex, setHourlySendex] = React.useState([{}]);

  React.useEffect(() => {
    if (props.apiResponse.weather !== undefined) {
      setHourlySendex(calculateSendex(props.apiResponse.weather.hourly));
    }
  }, [props.apiResponse]);

  /*
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="title">{`${formatDate(label)} : ${
            payload[0].value
          }`}</p>
        </div>
      );
    }
  };
  */

  function formatDate(dt) {
    return new Date(dt * 1000).toLocaleDateString("en-us", {
      month: "numeric",
      day: "numeric",
      hour: "numeric",
    });
  }

  function calculateSendex(hourlyWeather) {
    return hourlyWeather.map((el) => ({
      dt: el.dt,
      sendex: Math.round(2 * el.dew_point + el.humidity - el.temp),
    }));
  }

  return (
    <LineChart
      data={hourlySendex}
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
      <Tooltip
        offset={50}
        allowEscapeViewBox={{ x: false, y: false }}
        labelStyle={{ color: "#121212" }}
        labelFormatter={formatDate}
      />
      <Legend />
      <Line
        name="Hourly Sendex"
        type="monotone"
        dataKey="sendex"
        stroke="#C10B29"
        activeDot={{ r: 5 }}
      />
    </LineChart>
  );
}
