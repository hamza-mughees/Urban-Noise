import React, { useEffect, useState } from "react";
import { getData } from "./utils/apiReqs.js";
import NoiseChart from "./components/NoiseChart.jsx";

const App = () => {
  const [laeq, setLaeq] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLaeq(await getData());
      setDataLoaded(true);
    })();
  }, []);

  if (dataLoaded)
    return (
      <div className="App">
        <NoiseChart noiseData={laeq["10.1.1.1"].data}></NoiseChart>
        <NoiseChart noiseData={laeq["10.1.1.2"].data}></NoiseChart>
      </div>
    );
};

export default App;
