import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: ""
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <input
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handleOnChange}
          placeholder="First Name ..."
        />
        <br />
        <input
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={this.handleOnChange}
          placeholder="Last Name ..."
        />
        <br />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleOnChange}
          placeholder="Email ..."
        />
        <br />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.handleOnChange}
          placeholder="Password ..."
        />
        <br />
        <button
          onClick={() =>
            this.props.handleRegister(
              this.state.first_name,
              this.state.last_name,
              this.state.email,
              this.state.password
            )
          }
        >
          Register
        </button>
      </div>
    );
  }
}

export default Register;
