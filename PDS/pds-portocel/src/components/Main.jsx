import React, { Component } from 'react';
import ManutencoesAberto from './Telas/Cadastros/PDS/ManutencaoAberto';
import EditaMaquinas from './Telas/Cadastros/PDS/EditaMaquinas';
export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paginaPDS: false,
      idManutencao: 0,
      frota: '',
      cracha: '',
      data: '',
    }
    this.exibirPDS = this.exibirPDS.bind(this)
    this.fecharPDS = this.fecharPDS.bind(this)
  }
  exibirPDS(idManutencao, frota, cracha, data) {
    this.setState({
      idManutencao: idManutencao,
      frota: frota,
      cracha: cracha,
      data: data,
      paginaPDS: true
    })
  }
  fecharPDS() {
    this.setState({ paginaPDS: false })
  }
  render() {
    const {idManutencao,frota,cracha,data} = this.state
    return (
      this.state.paginaPDS ? <EditaMaquinas idManutencao={idManutencao} frota={frota} cracha={cracha} data={data} fecharPDS={this.fecharPDS}/> : <ManutencoesAberto exibirPDS={this.exibirPDS} />
    );
  }
}
