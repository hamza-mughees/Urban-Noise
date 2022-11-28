import React, { useEffect } from 'react'
import { getAllLeaq } from './utils/apiReqs.js'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const App = () => {
  useEffect(() => {
    getAllLeaq().then((res) => {
      console.log(res)                        // don't know what the hell is going on here
      console.log(Object.keys(res).length)
      console.log(Object.keys(res))
      console.log(res['10.1.1.1'])
    })
  }, [])

  return (<div className="App">Hello world</div>)

  // return (
  //   <ResponsiveContainer width="100%" height="100%">
  //     <LineChart
  //       width={500}
  //       height={300}
  //       data=
  //     ></LineChart>
  //   </ResponsiveContainer>
  // )
}

export default App;
