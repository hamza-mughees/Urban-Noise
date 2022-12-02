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
    let areas = [];
    let i = 0;
    let j = 0;

    while (j < data.length) {
      if (data[j].laeq >= lower && data[j].laeq <= upper) {
        j++;
      } else {
        if (j > 0) {
          areas.push([data[i].datetime, data[j].datetime]);
        }
        j++;
        i = j;
      }
    }

    if (i < data.length) {
      areas.push([data[i].datetime, data[data.length - 1].datetime]);
    }

    return areas;
  };

  const l1 = {
    areas: getAreas(props.monitorData.data, 0, 50),
    colour: props.colours.l1,
    id: 1,
  };

  const l2 = {
    areas: getAreas(props.monitorData.data, 50, 55),
    colour: props.colours.l2,
    id: 2,
  };

  const l3 = {
    areas: getAreas(props.monitorData.data, 55, 70),
    colour: props.colours.l3,
    id: 3,
  };

  const l4 = {
    areas: getAreas(props.monitorData.data, 70, 75),
    colour: props.colours.l4,
    id: 4,
  };

  const l5 = {
    areas: getAreas(props.monitorData.data, 75, 80),
    colour: props.colours.l5,
    id: 5,
  };

  const l6 = {
    areas: getAreas(props.monitorData.data, 80, 85),
    colour: props.colours.l6,
    id: 6,
  };

  const l7 = {
    areas: getAreas(props.monitorData.data, 85, Number.MAX_SAFE_INTEGER),
    colour: props.colours.l7,
    id: 7,
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Time: ${moment(label).format("HH:mm Do")}`}</p>
          <p className="label">{`Noise: ${payload[0].value} dB`}</p>
        </div>
      );
    }
  };

  return (
    <div>
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
          <Tooltip content={<CustomTooltip />} />
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
                key={`${l1.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l1.colour}
              ></ReferenceArea>
            );
          })}
          {l2.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l2.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l2.colour}
              ></ReferenceArea>
            );
          })}
          {l3.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l3.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l3.colour}
              ></ReferenceArea>
            );
          })}
          {l4.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l4.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l4.colour}
              ></ReferenceArea>
            );
          })}
          {l5.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l5.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l5.colour}
              ></ReferenceArea>
            );
          })}
          {l6.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l6.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l6.colour}
              ></ReferenceArea>
            );
          })}
          {l7.areas.map((region, index) => {
            return (
              <ReferenceArea
                key={`${l7.id}${index}`}
                x1={region[0]}
                x2={region[1]}
                fill={l7.colour}
              ></ReferenceArea>
            );
          })}
        </LineChart>
      </ResponsiveContainer>
      <h3 className="monitor-heading">{props.monitorData.location}</h3>
    </div>
  );
};

export default NoiseChart;
