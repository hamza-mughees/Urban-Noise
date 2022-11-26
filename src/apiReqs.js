var headers = new Headers()
headers.append('Content-Type', 'application/json')

var body = {
  username: 'dublincityapi',
  password: 'Xpa5vAQ9ki'
}

export async function getMonitors() {
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body),
    redirect: 'follow'
  }

  return await (await fetch('https://data.smartdublin.ie/sonitus-api/api/monitors', requestOptions)).json()
}

export async function getMonitorData(serial_number) {
  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      ...body,
      monitor: serial_number,
      start: '1668800000',
      end: '1669331670'
    }),
    redirect: 'follow'
  }

  return await (await fetch('https://data.smartdublin.ie/sonitus-api/api/data', requestOptions)).json()
}

export async function getAllLeaq() {
  var monitors = await getMonitors()
  var allLaeq = []

  monitors.forEach(async (m) => {
    if (m.label.split(' ')[0] === 'Noise') {
      var monitorData = await getMonitorData(m.serial_number)
      var monitorLaeq = []
      monitorData.forEach((r) => {
        monitorLaeq.push({
          datetime: r.datetime,
          laeq: r.laeq,
        })
      })
      allLaeq.push({
        serial_number: m.serial_number,
        label: m.label,
        laeq: monitorLaeq
      })
    }
  })

  return allLaeq
}