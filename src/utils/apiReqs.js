var headers = new Headers();
headers.append("Content-Type", "application/json");

var requestOptions = {
  method: "POST",
  headers: headers,
  redirect: "follow",
};

var body = {
  username: "dublincityapi",
  password: "Xpa5vAQ9ki",
};

export const getMonitors = async () =>
  (
    await fetch("https://data.smartdublin.ie/sonitus-api/api/monitors", {
      ...requestOptions,
      body: JSON.stringify(body),
    })
  ).json();

export const getMonitorData = async (serial_number, start, end) =>
  (
    await fetch("https://data.smartdublin.ie/sonitus-api/api/data", {
      ...requestOptions,
      body: JSON.stringify({
        ...body,
        monitor: serial_number,
        start: start, //"1668800000",
        end: end, //"1669331670",
      }),
    })
  ).json();

export const getData = async (start, end) => {
  var monitors = await getMonitors();
  var data = {};

  const promises = monitors.map(async (m) => {
    if (m.label.split(" ")[0] !== "Noise" || m.location === "In Office") {
      return;
    }

    await getMonitorData(m.serial_number, start, end).then((monitorData) => {
      var monitorReadings = monitorData.map((r) => {
        const [dateValues, timeValues] = r.datetime.split(" ");
        const [year, month, day] = dateValues.split("-");
        const [hours, minutes, seconds] = timeValues.split(":");

        return {
          datetime: new Date(
            +year,
            +month - 1,
            +day,
            +hours,
            +minutes,
            +seconds
          ).getTime(),
          laeq: r.laeq,
        };
      });

      data[m.serial_number] = {
        label: m.label,
        location: m.location,
        data: monitorReadings,
      };
    });
  });
  await Promise.all(promises);

  return data;
};
