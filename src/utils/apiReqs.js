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

export const getMonitorData = async (serial_number) =>
  (
    await fetch("https://data.smartdublin.ie/sonitus-api/api/data", {
      ...requestOptions,
      body: JSON.stringify({
        ...body,
        monitor: serial_number,
        start: "1668800000",
        end: "1669331670",
      }),
    })
  ).json();

export const getData = async () => {
  var monitors = await getMonitors();
  var data = {};

  const promises = monitors.map(async (m) => {
    if (m.label.split(" ")[0] !== "Noise" || m.location === "In Office") {
      return;
    }

    await getMonitorData(m.serial_number).then((monitorData) => {
      var monitorReadings = monitorData.map((r) => ({
        datetime: r.datetime,
        laeq: r.laeq,
      }));

      data[m.serial_number] = {
        label: m.label,
        data: monitorReadings,
      };
    });
  });
  await Promise.all(promises);

  return data;
};
