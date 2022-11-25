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

  const monitors = await fetch('https://data.smartdublin.ie/sonitus-api/api/monitors', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  
  return monitors
}

export async function getMonitorReadings(serial_number) {
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

  const readings = await fetch('https://data.smartdublin.ie/sonitus-api/api/data', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data
    })
  
  return readings
}