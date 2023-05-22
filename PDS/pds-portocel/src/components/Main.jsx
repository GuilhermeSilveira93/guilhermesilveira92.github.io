import React, { Component } from 'react';
import ManutencoesAberto from './Telas/Cadastros/PDS/ManutencoesAberto';
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <>
        <main>
          <ManutencoesAberto/>
        </main>
      </>
    );
  }
}
