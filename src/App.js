import React from 'react'
import { getAllLeaq } from './apiReqs.js'
// import { LineChart } from 'recharts'

function App() {
  getAllLeaq()
    .then((data) => {
      console.log(data)
    })
  
  return <div className="App">Hello Chart</div>
}

export default App;
