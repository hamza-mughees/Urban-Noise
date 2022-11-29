import React, { useEffect, useState } from "react";
import { getAllLaeq } from "./utils/apiReqs.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // ResponsiveContainer,
} from "recharts";

const App = () => {
  const [laeq, setLaeq] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLaeq(await getAllLaeq());
      setDataLoaded(true);
    })();
  }, []);

  if (dataLoaded)
    return (
      <div className="App">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <LineChart
          width={1500}
          height={300}
          data={laeq["10.1.1.1"].laeq}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
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
          {/* <Line type="monotone" dataKey="" stroke="#82ca9d" /> */}
        </LineChart>
        {/* </ResponsiveContainer> */}
      </div>
    );
};

export default App;
