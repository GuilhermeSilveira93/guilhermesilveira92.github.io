import React, { Component } from 'react';
import ManutencoesAberto from './Telas/Cadastros/PDS/ManutencaoAberto';
import EditaMaquinas from './Telas/Cadastros/PDS/EditaMaquinas';
export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
    paginaPDS: false
    }
    this.exibirPDS = this.exibirPDS.bind(this)
    this.fecharPDS = this.exibirPDS.bind(this)
  }
  exibirPDS(){
    this.setState({paginaPDS:true})
  }
  fecharPDS(){
    this.setState({paginaPDS:false})
  }
  render() {
    return (
          this.state.paginaPDS ? <EditaMaquinas/> : <ManutencoesAberto exibirPDS={this.exibirPDS}/>
      
    );
  }
}
