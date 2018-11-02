import React, { Component } from "react";
import Login from "./Login";
import axios from "axios";
import Register from "./Register";
class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuth: false,
      employeesData: []
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
          localStorage.setItem("token", res.data.token);
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
        if (res.data.message === "insert account data success") {
          alert(res.data.message);
        } else {
          alert(res.data.message);
        }
      })
      .catch(err => console.log(err));
  };

  getEmployeesData = () => {
    axios
      .get("https://impact-byte-demo.herokuapp.com/employees", {
        headers: {
          authorization: `bearer ${localStorage.token}`
        }
      })
      .then(res =>
        this.setState({
          employeesData: res.data.data
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>React Auth</h1>
        <Login handleLogin={this.handleLogin} />
        <Register handleRegister={this.handleRegister} />
        {this.state.isAuth === true && <h1>You are authenticated!</h1>}
        {this.state.isAuth === false && <h1>You are not authenticated!</h1>}
        <button onClick={this.getEmployeesData}>Get Employee</button>
        {this.state.employeesData.map((employee, index) => (
          <div key={index}>
            <li>Name : {`${employee.first_name} ${employee.last_name}`}</li>
            <li>Gender: {employee.gender}</li>
            <li>Birth Date: {employee.birth_date}</li>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default App;
