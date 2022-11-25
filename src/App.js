import React from 'react'
import { getMonitors, getMonitorReadings } from './apiReqs.js'

function App() {
  getMonitors()
    .then((monitors) => {
      monitors.forEach((m) => {
        if (m.label.split(' ')[0] === 'Noise')
          getMonitorReadings(m.serial_number)
            .then((readings) => {
              var dbs = []
              readings.forEach((r) => {
                dbs.push(r.laeq)
              })
              console.log(dbs)
            })
      })
    })

  return <div></div>
}

export default App;
