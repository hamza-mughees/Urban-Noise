import React, { useEffect, useState } from "react";
import moment from "moment";
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
  // Legend,
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

  const getAreas = (data, lower, upper) => {
    var areas = [];
    var x1 = undefined;
    var x2 = undefined;

    data.forEach((reading) => {
      if (reading.laeq >= lower && reading.laeq <= upper) {
        if (x1 === undefined) {
          x1 = reading.datetime;
          x2 = reading.datetime;
        } else {
          x2 = reading.datetime;
        }
      } else {
        if (x1 !== undefined) {
          areas.push([x1, x2]);
          x1 = undefined;
          x2 = undefined;
        }
      }
    });

    return areas;
  };

  const l1 = {
    areas: getAreas(props.monitorData.data, 0, 50),
    colour: "green",
    text: undefined,
  };

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
        <CartesianGrid horizontal="true" vertical="" />
        <XAxis
          dataKey="datetime"
          tickFormatter={(unixTime) => moment(unixTime).format("HH:mm Do")}
          domain={["auto", "auto"]}
          type="number"
          tickCount={10}
        />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
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
        {l1.areas.map((region, index) => {
          return (
            <ReferenceArea
              key={index}
              x1={region[0]}
              x2={region[1]}
              fill={l1.colour}
            ></ReferenceArea>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NoiseChart;
