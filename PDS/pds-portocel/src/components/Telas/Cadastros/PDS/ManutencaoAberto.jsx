import React, { Component } from "react"
import api from '../../../../api/Api';
export default class ManutencoesAberto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manutencoesAbertas: [],
      paginaPDS: false,
      idManutencao: 0,
      idVeiculo: 0,
      idMotorista: 0,
      numeroFrota: '',
      tipoRastreado: '',
      inicio: '',
      nomeMotorista: ''
    };
  }
  componentDidMount() {
    api
      .get('manutencoes_abertas.json').then((resposta) => {
        this.setState({ manutencoesAbertas: resposta.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { manutencoesAbertas } = this.state
    const { exibirPDS } = this.props
    return (
      <section id="Tabela" className="filhos">
        <h2>Manutenções - PDS</h2>
        <div className="pds" style={{ overflowy: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Frota</th>
                <th>Tipo Maquina</th>
                <th>Tipo Manutenção</th>
                <th>Data</th>
                <th>Quem Abriu</th>
              </tr>
            </thead>
            <tbody>
              {manutencoesAbertas ? (
                manutencoesAbertas.map((manutencao) => {
                  return (
                    manutencao.S_NOME !== 'Sem Operador' ?
                      <tr key={manutencao.ID_MANUTENCAO} id={manutencao.ID_MANUTENCAO}>
                        <th onClick={
                          () => exibirPDS(manutencao.ID_MANUTENCAO, manutencao['Frota'], manutencao['Quem Abriu'], manutencao['Data'], manutencao.ID_TIPO_INTERVENCAO)}
                          style={{ cursor: 'pointer' }}
                          id={manutencao.ID_MANUTENCAO}>PDS</th>
                        <th id={manutencao.ID_VEICULO}>{manutencao['Frota']}</th>
                        <th id={manutencao['Tipo Maquina']}>{manutencao['Tipo Maquina']}</th>
                        <th>Manutenções em Aberto</th>
                        <th id={manutencao['Data']}>{manutencao['Data']}</th>
                        <th id={manutencao['Quem Abriu']}>{manutencao['Quem Abriu']}</th>
                      </tr> : ''
                  );
                })
              ) : (
                'Erro'
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}