import React, { useEffect, useState } from "react";
import { getAllLaeq } from "./utils/apiReqs.js";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const App = () => {
  const [laeq, setLaeq] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getAllLaeq();
      setLaeq(res);
    })();
  }, []);

  return <div className="App">Hello world</div>;

  // return (
  //   <ResponsiveContainer width="100%" height="100%">
  //     <LineChart
  //       width={500}
  //       height={300}
  //       data=
  //     ></LineChart>
  //   </ResponsiveContainer>
  // )
};

export default App;
