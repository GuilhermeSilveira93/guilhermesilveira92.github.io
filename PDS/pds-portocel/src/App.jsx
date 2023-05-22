import Main from './components/Main';
import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem('Usuario') && sessionStorage.getItem('Usuario').indexOf('NOME') > 0) {
      this.setState({
        usuarioSessao: JSON.parse(sessionStorage.getItem('Usuario')),
      });
    }
  }

  render() {
    return (
      <Main />
    )
  }
}
