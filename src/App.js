import React, { Component } from "react"
import "./App.css"
import Form from "./Form";

class App extends Component {
  render() {
    return (
      <div className="App">
      {/*   <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <LambdaDemo />
         
        </header> */}
        <Form/>
      </div>
    )
  }
}

export default App
