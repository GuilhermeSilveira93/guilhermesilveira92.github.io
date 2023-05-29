import React, { Component } from "react"
import logo from "../images/h1_back.png"
export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <header>
        <h1><img src={logo} alt="Softrack"/></h1>
      </header>
    );
  }
}