import React, { useEffect, useState } from "react";
import { getData } from "./utils/apiReqs.js";
import NoiseChart from "./components/NoiseChart.jsx";
import InfoBox from "./components/InfoBox";

const App = () => {
  const [data, setData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const colours = {
    l1: "#1F9EF9", // < 50
    l2: "#49D79C", // 50 - 55
    l3: "#52D749", // 55 - 70
    l4: "#DAE04B", // 70 - 75
    l5: "#E7AC53", // 75 - 80
    l6: "#DB895F", // 80 - 85
    l7: "#E73B3B", // > 85
  };

  useEffect(() => {
    (async () => {
      const currentTime = Math.floor(Date.now() / 1000);
      const oneDayAgo = currentTime - 86400;

      setData(await getData(oneDayAgo, currentTime));
      setDataLoaded(true);
    })();
  }, []);

  if (dataLoaded) {
    return (
      <div className="App">
        <InfoBox
          defaultText="Level 1: Click to Expand"
          expandedText={[
            "This level highlights signals less than 50 dB.",
            "At this level, the sound intensity is mostly safe. It is however, still too much for an optimal nights sleep.",
          ]}
          colour={colours.l1}
        ></InfoBox>
        <InfoBox
          defaultText="Level 2: Click to Expand"
          expandedText={[
            "This level highlights signals between 50 dB and 55 dB.",
            "Noise at this level can start to increase the risks of myocardial infarction by chronically elevating cortisol production. " +
              "This level can also start to cause sleep disturbance for people who sleep well at the recomended noise level (<35 dB).",
          ]}
          colour={colours.l2}
        ></InfoBox>
        <InfoBox
          defaultText="Level 3: Click to Expand"
          expandedText={[
            "This level highlights signals between 55 dB and 70 dB.",
            "At this noise level, data from surveys shows that community annoyance starts to significantly increase.",
          ]}
          colour={colours.l3}
        ></InfoBox>
        <InfoBox
          defaultText="Level 4: Click to Expand"
          expandedText={[
            "This level highlights signals between 70 dB and 75 dB.",
            "At this noise level, we start to notice an effect on the sympathetic division of the autonomic nervous system. " +
              "The chances of phenomenons such as bradycardia and increased skin conductance also rise.",
          ]}
          colour={colours.l4}
        ></InfoBox>
        <InfoBox
          defaultText="Level 5: Click to Expand"
          expandedText={[
            "This level highlights signals between 75 dB and 80 dB.",
            "This noise level increases the risk of hearing damage, especially in working environments.",
          ]}
          colour={colours.l5}
        ></InfoBox>
        <InfoBox
          defaultText="Level 6: Click to Expand"
          expandedText={[
            "This level highlights signals between 80 dB and 85 dB.",
            "At this level, the chances of having a high blood-pressure increase significantly.",
          ]}
          colour={colours.l6}
        ></InfoBox>
        <InfoBox
          defaultText="Level 7: Click to Expand"
          expandedText={[
            "This level highlights signals greater than 85 dB.",
            "At this level, the chances of acquiring Ischemic Heart Disease (IHD) are dangerously increased by approximately 29%.",
          ]}
          colour={colours.l7}
        ></InfoBox>
        {/* <NoiseChart monitorData={data["10.1.1.1"]}></NoiseChart>
        <NoiseChart monitorData={data["10.1.1.2"]}></NoiseChart> */}
        {Object.keys(data).map((item, index) => {
          return (
            <NoiseChart
              key={index}
              monitorData={data[item]}
              colours={colours}
            ></NoiseChart>
          );
        })}
      </div>
    );
  }
};

export default App;
