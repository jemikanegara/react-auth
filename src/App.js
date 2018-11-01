import React, { Component } from "react";
import Login from "./Login";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false
    };
  }

  handleLogin = (email, password) => {
    const data = {
      email: email,
      password: password
    };
    axios
      .post(`https://impact-byte-demo.herokuapp.com/accounts/login`, data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>React Auth</h1>
        <Login handleLogin={this.handleLogin} />
      </div>
    );
  }
}

export default App;
