import React, { Component } from "react"
import api from '../../../../api/Api';
import Mensagem from '../Mensagem';

export default class EditaMaquinas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo:'',
      idMensagem:'',
      paragrafo1:'',
      paragrafo2:'',
      mensagem: false,
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
    this.mostrarMensagem = this.mostrarMensagem.bind(this)
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
  mostrarMensagem() {
    if (this.state.mensagem) {
      this.setState({ mensagem: false })
    } else {
      this.setState({ mensagem: true })
    }
  }

  getForm(e) {
    e.preventDefault();
    const { idManutencao, controladorDeCargas, operadorTPA, portoCel, jsl, horimetro, anotacoes,cracha } = this.state;
    const codigo = document.getElementsByName("codigo");
    let novosCodigos = [];
    codigo.forEach((valores) => {
      if (valores.checked) {
        novosCodigos.push(valores.value);
      }
    });
    this.setState(
      {
        id_tipo_intervencao: novosCodigos,
      },
      () => {
        const { id_tipo_intervencao } = this.state;
        if (id_tipo_intervencao.length > 0 && idManutencao.length > 0 && controladorDeCargas.length > 0 && operadorTPA.length > 0 &&
          portoCel.length > 0 && jsl.length > 0 && horimetro.length > 0 && anotacoes.length > 0) {
          api
            .post("/registrarntervencao.json", {
              params: {
                id_tipo_intervencao: id_tipo_intervencao,
                idManutencao: idManutencao,
                controlador: controladorDeCargas,
                operadorTPA: operadorTPA,
                portocel: portoCel,
                jsl: jsl,
                horimetro: horimetro,
                aexecutar: anotacoes,
                cracha:cracha
              },
            })
            .then((resposta) => {
              this.setState({ mensagem: true,
                              idMensagem:'mensagemNormal',
                              titulo:'Sucesso',
                              paragrafo1:'Dados Enviados com Sucesso !',
                              paragrafo2:''
                            });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.setState({ mensagem: true,
                          idMensagem:'mensagemErro',
                          titulo:'Erro',
                          paragrafo1:'Por favor, verifique se todos os campos foram preenchidos.',
                          paragrafo2:'Campos com ( * ) são obrigatórios'
                        });
        }
      }
    );
  }
  render() {
    let date = new Date()
    let dia = date.getDate()
    let mes = date.getMonth() + 1
    dia = (dia<10 ? '0' : '') + dia
    mes = (mes<10 ? '0' : '') + mes
    const { tipoIntervencao, frota, cracha, data, mensagem, anotacoes,titulo,paragrafo1,paragrafo2,idMensagem } = this.state
    const { fecharPDS } = this.props
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
              {` ${tipoIntervencao[index]['Tipo Intervenção']}`}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna]['Codigo']} value={tipoIntervencao[index + tamanhoColuna].ID_TIPO_INTERVENCAO} /> : ''}
              {index + tamanhoColuna < tipoIntervencao.length ? ` ${tipoIntervencao[index + tamanhoColuna]['Tipo Intervenção']}` : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? tipoIntervencao[index + tamanhoColuna * 2]['Codigo'] : ''}
            </td>
            <td>
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? <input type="checkbox" name="codigo" id={tipoIntervencao[index + tamanhoColuna * 2]['Codigo']} value={tipoIntervencao[index + tamanhoColuna * 2].ID_TIPO_INTERVENCAO} /> : ''}
              {index + tamanhoColuna * 2 < tipoIntervencao.length ? ` ${tipoIntervencao[index + tamanhoColuna * 2]['Tipo Intervenção']}` : ''}
            </td>
          </tr>
        )
      }

    }
    return (
      <>
        {mensagem ? <Mensagem idMensagem={idMensagem} mostrarMensagem={this.mostrarMensagem} titulo={titulo} paragrafo1={paragrafo1} paragrafo2={paragrafo2} fecharPDS={fecharPDS}/> : ''}
        <main>
          <div id="content">
            <h2>Pedido de Serviço - PDS</h2>
              <form action="post">
                <label htmlFor="controladorDeCargas" name="controladorDeCargas" id="controladorDeCargas">*CONTROLADOR DE CARGAS: </label>
                <input type="text" name="controladorDeCargas" id="controladorDeCargas" maxLength={100} style={{ width: '72.2%' }} onChange={(e) => this.setState({ controladorDeCargas: e.target.value })} /><br />

                <label htmlFor="operadorTPA" name="operadorTPA" id="operadorTPA">*OPERADOR TPA: </label>
                <input type="text" name="operadorTPA" id="operadorTPA" maxLength={100} onChange={(e) => this.setState({ operadorTPA: e.target.value })} />

                <label htmlFor="portoCel" name="portoCel" id="portoCel">*PORTOCEL: </label>
                <input type="text" name="portoCel" maxLength={100} id="portoCel" onChange={(e) => this.setState({ portoCel: e.target.value })} />

                <label htmlFor="jsl" name="jsl" id="jsl">*JSL: </label>
                <input type="text" maxLength={100} name="jsl" id="jsl" onChange={(e) => this.setState({ jsl: e.target.value })} /><br />

                <label htmlFor="cracha" name="cracha" id="cracha">NOME DO SOLICITANTE PDS: </label>
                <input type="text" maxLength={100} htmlFor='cracha'id='cracha' value={cracha} placeholder="Digite seu Nome" onChange={(e)=> this.setState({cracha: e.target.value})}/>

                <label htmlFor="Frota" name="Frota" id="Frota">FROTA: {frota}</label>

                <label htmlFor="Horimetro" name="Horimetro" id="Horimetro">*HORÍMETRO: </label>
                <input type="number" name="Horimetro" id="Horimetro" onChange={(e) => this.setState({ horimetro: e.target.value })} onKeyDown={(e) => {
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      }} />

                <label htmlFor="Data" name="Data" id="Data">DATA DA MANUTENÇÃO: {data}</label>
                <label htmlFor="DataAtual" name="DataAtual" id="DataAtual">DATA PDS: {dia}/{mes}/{date.getFullYear()}</label>
              </form>
            <div id="tipoIntervencao">
              <table>
                <thead>
                  <tr>
                    <th className="codigo"><h3>Codigo</h3></th>
                    <th><h3>Tipo Intervenção</h3></th>
                    <th className="codigo"><h3>Codigo</h3></th>
                    <th><h3>Tipo Intervenção</h3></th>
                    <th className="codigo"><h3>Codigo</h3></th>
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
              <label htmlFor="anotacoes">*Serviço a Executar</label>
              <label htmlFor="anotacoes" style={{ float: 'right' }}>{anotacoes.length}/500 caracteres</label>
              <textarea maxLength={500} name="anotacoes" cols="100" rows="10" style={{ resize: 'none' }} onChange={(e) => this.setState({ anotacoes: e.target.value })}></textarea>
              <button id="voltar" onClick={() => fecharPDS()}>Voltar</button>
              <button type="submit" onClick={this.getForm}>Enviar</button>
            </div>
            
          </div>
        </main >
      </>
    )
  }

}