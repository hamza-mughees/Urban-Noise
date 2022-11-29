import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const NoiseChart = (props) => {
  const [chartWidth, setChartWidth] = useState(window.innerWidth);
  const [chartHeight, setChartHeight] = useState(window.innerHeight / 2);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setChartWidth(window.innerWidth);
      setChartHeight(window.innerHeight / 2);
    });
  }, []);

  return (
    <ResponsiveContainer minWidth={chartWidth} minHeight={chartHeight}>
      <LineChart
        // width={window.innerWidth}
        // height={window.innerHeight}
        data={props.noiseData}
        margin={{
          top: 50,
          right: 50,
          left: 50,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="datetime" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="laeq"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NoiseChart;
