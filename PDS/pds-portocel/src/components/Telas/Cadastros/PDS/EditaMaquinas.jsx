import React, { Component } from "react"
import api from '../../../../api/Api';

export default class EditaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoIntervencao: [],
      id_tipo_intervencao: [],
      controladorDeCargas: '',
      operadorTPA: '',
      portoCel: '',
      jsl: '',
      horimetro: '',
      anotacoes: '',
      frota: this.props.frota,
      cracha: this.props.cracha,
      data: this.props.data,
      idManutencao: this.props.idManutencao,
    }
    this.getForm = this.getForm.bind(this)
  }
  componentDidMount() {
    api
      .get('/tipo_intervencao.json').then((resposta) => {
        const dadosMaquina = resposta.data
        this.setState({
          tipoIntervencao: dadosMaquina
        })
      })
      .catch((error) => console.log(error));
  };
  getForm() {
    const codigo = document.getElementsByName('codigo')
    let novosCodigos = []
    codigo.forEach(valores => {
      if (valores.checked) {
        novosCodigos.push(valores.value)
      }
    })
    this.setState({
      id_tipo_intervencao: novosCodigos,
    }, () => {
      if (this.state.id_tipo_intervencao.length > 0) {
        api
          .post('/registrarntervencao.json', {
            params: {
              id_tipo_intervencao: this.state.id_tipo_intervencao,
              idManutencao: this.state.idManutencao,
              controlador: this.state.controladorDeCargas,
              operadorTPA: this.state.operadorTPA,
              portocel: this.state.portoCel,
              jsl: this.state.jsl,
              horimetro: this.state.horimetro,
              aexecutar: this.state.anotacoes
            }
          }).then((resposta) => {
            alert('Dados inseridos com sucesso')
          })
          .catch((error) => alert(error) + console.log(this.state.controladorDeCargas));
      } else {
        alert('Selecione um tipo de intervenção')
      }

    })

  }
  render() {
    const { tipoIntervencao, frota, cracha, data } = this.state
    const {fecharPDS} = this.props
    let linhas = []
    if (tipoIntervencao && tipoIntervencao.length > 0) {
      let tamanhoColuna = Number.parseInt(tipoIntervencao.length / 3)
      let resto = tipoIntervencao.length % 3
      tamanhoColuna = resto > 0 ? tamanhoColuna + 1 : tamanhoColuna
      for (let index = 0; index < tamanhoColuna; index++) {
        linhas.push(
          <tr key={tipoIntervencao[index]['Codigo']}>
            <td>{tipoIntervencao[index]['Codigo']}</td>
            <td>
              <input type="checkbox" name="codigo" id={tipoIntervencao[index]['Codigo']} value={tipoIntervencao[index].ID_TIPO_INTERVENCAO} />
              {tipoIntervencao[index]['Tipo Intervenção']}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna]['Codigo']} value={tipoIntervencao[index + tamanhoColuna].ID_TIPO_INTERVENCAO} /> : ''}
              {index + tamanhoColuna < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna]['Tipo Intervenção'] : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna * 2]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna * 2]['Codigo']} value={tipoIntervencao[index + tamanhoColuna * 2].ID_TIPO_INTERVENCAO} /> : ''}
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna * 2]['Tipo Intervenção'] : ''}
            </td>
          </tr>
        )
      }

    }
    return (
      <main>
        <div id="header">
          <h1>Pedido de Serviço - PDS</h1>
          <fieldset>
            <legend>Configurações da Manutenção</legend>
            <form action="post">
              <label htmlFor="controladorDeCargas" name="controladorDeCargas" id="controladorDeCargas">CONTROLADOR DE CARGAS
                :</label>
              <input type="text" name="controladorDeCargas" id="controladorDeCargas" style={{ width: '72.2%' }} onChange={(e) => this.setState({ controladorDeCargas: e.target.value })} /><br />

              <label htmlFor="operadorTPA" name="operadorTPA" id="operadorTPA">OPERADOR TPA
                :</label>
              <input type="text" name="operadorTPA" id="operadorTPA" onChange={(e) => this.setState({ operadorTPA: e.target.value })}></input>

              <label htmlFor="portoCel" name="portoCel" id="portoCel">PORTOCEL
                :</label>
              <input type="text" name="portoCel" id="portoCel" onChange={(e) => this.setState({ portoCel: e.target.value })} />

              <label htmlFor="jsl" name="jsl" id="jsl">JSL
                :</label>
              <input type="text" name="jsl" id="jsl" onChange={(e) => this.setState({ jsl: e.target.value })} /><br />

              <label htmlFor="cracha" name="cracha" id="cracha">Cracha : {cracha}</label>

              <label htmlFor="Frota" name="Frota" id="Frota">Frota : {frota}</label>

              <label htmlFor="Horimetro" name="Horimetro" id="Horimetro">HORÍMETRO
                :</label>
              <input type="number" name="Horimetro" id="Horimetro" onChange={(e) => this.setState({ horimetro: e.target.value })} />

              <label htmlFor="Data" name="Data" id="Data">DATA: {data}</label>
            </form>
          </fieldset>
          <div id="tipoIntervencao">
            <table border="1">
              <thead>
                <tr>
                  <th><h3>Codigo</h3></th>
                  <th><h3>Tipo Intervenção</h3></th>
                  <th><h3>Codigo</h3></th>
                  <th><h3>Tipo Intervenção</h3></th>
                  <th><h3>Codigo</h3></th>
                  <th><h3>Tipo Intervenção</h3></th>
                </tr>
              </thead>
              <tbody>
                {
                  tipoIntervencao ?
                    linhas
                    : ''
                }
              </tbody>
            </table>
          </div>
          <div id="anotacoes">
            <label htmlFor="anotacoes">Serviço a Executar</label><br />
            <textarea name="anotacoes" id="anotacoes" cols="100" rows="10" style={{ resize: 'none' }} onChange={(e) => this.setState({ anotacoes: e.target.value })}></textarea>
          </div>
          <button type="submit" onClick={this.getForm}>Enviar</button>
          <button id="voltar" onClick={() => fecharPDS()}>Voltar</button>
        </div>
      </main >
    )
  }

}