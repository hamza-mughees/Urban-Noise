import React, { useEffect, useState } from "react";
import { getData } from "./utils/apiReqs.js";
import NoiseChart from "./components/NoiseChart.jsx";

const App = () => {
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setData(await getData());
      setDataLoaded(true);
    })();
  }, []);

  if (dataLoaded) {
    return (
      <div className="App">
        <NoiseChart monitorData={data["10.1.1.1"]}></NoiseChart>
        {/* <NoiseChart monitorData={data["10.1.1.2"]}></NoiseChart> */}
        {/* {
          Object.keys(data).map((item, index) => {
            return <NoiseChart key={index} noiseData={data[item].data}></NoiseChart>
          })
        } */}
      </div>
    );
  }
};

export default App;
