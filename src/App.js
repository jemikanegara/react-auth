import React, { Component } from "react";
import Login from "./Login";
import axios from "axios";
import Register from "./Register";
import EmployeeDetail from "./EmployeeDetail";

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
    if (localStorage.token !== undefined) {
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
    } else {
      alert("You are not logged in");
    }
  };

  handleLogOut = () => {
    localStorage.removeItem("token");
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
        <button onClick={this.handleLogOut}>Log Out</button>
        {this.state.employeesData.length > 0 &&
          this.state.employeesData.map((employee, index) => (
            <EmployeeDetail
              key={index}
              emp_no={employee.emp_no}
              first_name={employee.first_name}
              last_name={employee.last_name}
              birth_date={employee.birth_date}
              gender={employee.gender}
            />
          ))}
      </div>
    );
  }
}

export default App;
