import React, { useEffect, useState } from "react";
import {
  // AreaChart,
  // Area,
  LineChart,
  Line,
  // ReferenceLine,
  ReferenceArea,
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

  const getL1s = (data) => {
    var l1 = [];
    var x1 = undefined;
    var x2 = undefined;

    data.forEach((reading) => {
      if (reading.laeq >= 50) {
        if (x1 === undefined) {
          x1 = reading.datetime;
          x2 = reading.datetime;
        } else {
          x2 = reading.datetime;
        }
      } else {
        if (x1 !== undefined) {
          l1.push([x1, x2]);
          x1 = undefined;
          x2 = undefined;
        }
      }
    });

    return l1;
  };

  const l1s = getL1s(props.monitorData.data);

  return (
    <ResponsiveContainer minWidth={chartWidth} minHeight={chartHeight}>
      <LineChart
        // width={window.innerWidth}
        // height={window.innerHeight}
        data={props.monitorData.data}
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
        {/* <ReferenceLine y={50} label={{
          position: "right",
          value: "sample"
        }}></ReferenceLine> */}
        {l1s.map((region) => {
          return <ReferenceArea x1={region[0]} x2={region[1]}></ReferenceArea>;
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NoiseChart;
