import React, { Component } from "react"
import api from '../../../../api/Api';

export default class EditaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoIntervencao: [],
      codigos:[]
    }
    this.teste = this.teste.bind(this)
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
  teste(){
    const checkbox = document.getElementsByName('codigo')
    let novosCodigos = []
    checkbox.forEach(valores => {
      if (valores.checked) {
        novosCodigos.push(valores.value)
      }
    })
    this.setState({codigos:novosCodigos},() => {
      api
      .post('/tipo_intervencao.json',{
        params:{
          codigos: this.state.codigos
        }
      }).then((resposta) => {
        
      })
      .catch((error) => console.log(error));
    })
    
  }
  render() {
    const { tipoIntervencao } = this.state
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
              <input type="checkbox" name="codigo" id={tipoIntervencao[index]['Codigo']} value={tipoIntervencao[index]['Codigo']} />
              {tipoIntervencao[index]['Tipo Intervenção']}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna]['Codigo']} value={tipoIntervencao[index + tamanhoColuna]['Codigo']} /> : ''}
              {index + tamanhoColuna < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna]['Tipo Intervenção'] : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna * 2]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna * 2]['Codigo']} value={tipoIntervencao[index + tamanhoColuna * 2]['Codigo']} /> : ''}
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
              <input type="text" name="controladorDeCargas" id="controladorDeCargas" style={{ width: '72.2%' }} /><br />

              <label htmlFor="operadorTPA" name="operadorTPA" id="operadorTPA">OPERADOR TPA
                :</label>
              <input type="text" name="operadorTPA" id="operadorTPA"></input>

              <label htmlFor="portoCel" name="portoCel" id="portoCel">PORTOCEL
                :</label>
              <input type="text" name="portoCel" id="portoCel" />

              <label htmlFor="jsl" name="jsl" id="jsl">JSL
                :</label>
              <input type="text" name="jsl" id="jsl" /><br />

              <label htmlFor="cracha" name="cracha" id="cracha"></label>

              <label htmlFor="Frota" name="Frota" id="Frota"></label>

              <label htmlFor="Horimetro" name="Horimetro" id="Horimetro">HORÍMETRO
                :</label>
              <input type="number" name="Horimetro" id="Horimetro" />

              <label htmlFor="Data" name="Data" id="Data">DATA: 10/05/2023 13:23</label>
            </form>
          </fieldset>
          <div id="tipoIntervencao">
            <table border="1">
              <thead>
                <tr>
                  <th>
                    <h3>Codigo</h3>
                  </th>
                  <th>
                    <h3>Tipo Intervenção</h3>
                  </th>
                  <th>
                    <h3>Codigo</h3>
                  </th>
                  <th>
                    <h3>Tipo Intervenção</h3>
                  </th>
                  <th>
                    <h3>Codigo</h3>
                  </th>
                  <th>
                    <h3>Tipo Intervenção</h3>
                  </th>
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
            <textarea name="anotacoes" id="anotacoes" cols="100" rows="10" style={{ resize: 'none' }}></textarea>
          </div>
          <button type="submit" onClick={this.teste}>Enviar</button>
        </div>
      </main >
    )
  }

}