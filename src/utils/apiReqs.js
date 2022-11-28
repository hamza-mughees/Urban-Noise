var headers = new Headers()
headers.append('Content-Type', 'application/json')

var requestOptions = {
  method: 'POST',
  headers: headers,
  redirect: 'follow'
}

var body = {
  username: 'dublincityapi',
  password: 'Xpa5vAQ9ki'
}

export const getMonitors = async () => {
  return await (await fetch('https://data.smartdublin.ie/sonitus-api/api/monitors', {
    ...requestOptions,
    body: JSON.stringify(body)
  })).json()
}

export const getMonitorData = async (serial_number) => {
  return await (await fetch('https://data.smartdublin.ie/sonitus-api/api/data', {
    ...requestOptions,
    body: JSON.stringify({
      ...body,
      monitor: serial_number,
      start: '1668800000',
      end: '1669331670'
    })
  })).json()
}

export const getAllLeaq = async () => {
  var monitors = await getMonitors()
  var allLaeq = {}

  // console.log(monitors)

  for (const i in monitors)  {  
    const m = monitors[i] 
    if (m.label.split(' ')[0] === 'Noise' && m.location !== "In Office") {
      // console.log(`Interation ${i}`, m)
      
      getMonitorData(m.serial_number).then((monitorData) => {
        var monitorLaeq = []

        monitorData.forEach((r) => {
          monitorLaeq.push({
            datetime: r.datetime,
            laeq: r.laeq,
          })
        })
        
        allLaeq[m.serial_number] = {
          label: m.label,
          laeq: monitorLaeq
        }
      })
      // console.log(allLaeq)
    }
  }

  return allLaeq
}