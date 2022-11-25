import React from 'react'

function App() {
  var headers = new Headers()
  headers.append('Content-Type', 'applications/json')

  var body = JSON.stringify({
    'username': 'dublincityapi',
    'password': 'Xpa5vAQ9ki'
  })

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: body,
    redirect: 'follow'
  }

  fetch('https://data.smartdublin.ie/sonitus-api/api/monitors', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })

  return <div>Hello World!</div>
}

export default App;
