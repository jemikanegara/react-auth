import React, { Component } from "react";
import Login from "./Login";
import axios from "axios";
import Register from "./Register";
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

      .then(res => {
        if (res.data.message === "You are logged in") {
          this.setState({ isAuth: true });
        } else {
          alert(res.data.message);
        }
      })

      .catch(err => console.log(err));
  };

  handleRegister = (first_name, last_name, email, password) => {
    const body = {
      first_name,
      last_name,
      email,
      password
    };

    axios
      .post(`https://impact-byte-demo.herokuapp.com/accounts/register`, body)
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "insert account data success") {
          this.setState({ isAuth: true });
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>React Auth</h1>
        <Login handleLogin={this.handleLogin} />
        <Register handleRegister={this.handleRegister} />
      </div>
    );
  }
}

export default App;
