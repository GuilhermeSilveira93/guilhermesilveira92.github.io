import React, { Component } from "react"
import api from '../../../../api/Api';

export default class EditaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tipoIntervencao: [],
    }
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
  render() {
    const { id } = this.props
    const { tipoIntervencao } = this.state
    let linhas = []
    for (let index = 0; index < tipoIntervencao.length; index++) {
      if (index < tipoIntervencao.length / 3) {
        const codigo = tipoIntervencao[index]['Codigo'];
        const tipo = tipoIntervencao[index]['Tipo Intervenção'];
        const linha = <tr className="linhas"><td>{codigo}</td><td>{tipo}</td></tr>
        linhas.push(linha)
      } else {
        const trlinhas = document.querySelector('.linhas')
        console.log(trlinhas)
        for (let index = 0; index < trlinhas.length; index++) {
          const valor = trlinhas[index];
          console.log(valor)
          /*if (valor.children.length === 2) {
            checkboxLabel.append(valores.itens)
            checkbox.append(valores.itens)
            tdCodigo.append(valores.codigo)
            tdTipoIntervencao.append(checkbox)
            tdTipoIntervencao.append(checkboxLabel)
            valor.appendChild(tdCodigo)
            valor.appendChild(tdTipoIntervencao)
            divTipoIntervencao.append(valor)
            break
          } */
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
          </div>
        </main>
      )
    }

  }
}