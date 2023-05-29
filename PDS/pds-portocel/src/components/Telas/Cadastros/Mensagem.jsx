import React, { Component } from "react"
export default class Mensagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { mostrarMensagem } = this.props
    return (
      <>
        <div id="fundo"></div>
        <div id="janela">
          <div className="alerta">
            <div id="title">
              <h4>Erro</h4>
            </div>
            <div id="mensagem">
              <p>Por favor, selecione um tipo de intervenção para enviar o PDS</p>
            </div>
            <hr />
            <button onClick={() => mostrarMensagem()}>Fechar</button>
          </div>
        </div>
      </>
    );
  }
}