import React, { Component } from "react"
export default class Mensagem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { mostrarMensagem, titulo , paragrafo1, paragrafo2 , paragrafo3, idMensagem } = this.props
    return (
      <>
        <div id="fundo"></div>
        <div id="janela">
          <div className="alerta">
            <div id="title">
              <h4>{titulo}</h4>
            </div>
            <div id={idMensagem}>
              <p>{paragrafo1}</p>
              <p>{paragrafo2}</p>
              <p>{paragrafo3}</p>
            </div>
            <hr />
            <button onClick={() => mostrarMensagem()}>Fechar</button>
          </div>
        </div>
      </>
    );
  }
}