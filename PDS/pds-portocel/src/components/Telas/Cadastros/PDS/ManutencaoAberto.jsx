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
        console.log(resposta.data)
        this.setState({ manutencoesAbertas: resposta.data });
      })
      .catch((error) => console.log(error));
  };
  render() {
    const { manutencoesAbertas } = this.state
    const { exibirPDS } = this.props
    return (
      <main>
        <section id="Tabela" className="filhos">
          <div className="pds" style={{ overflowy: 'auto' }}>
            <h2>Manutenções - PDS</h2>
            <table>
              <thead>
                {manutencoesAbertas && manutencoesAbertas.length > 0 ?
                  <tr>
                    <th></th>
                    <th>Frota</th>
                    <th>Tipo Maquina</th>
                    <th>Tipo Manutenção</th>
                    <th>Data</th>
                    <th>Quem Abriu</th>
                  </tr>
                  :
                  <tr>
                    <th>Não há Manutenções em aberto</th>
                    </tr>}
              </thead>
              <tbody>
                {manutencoesAbertas ? (
                  manutencoesAbertas.map((manutencao) => {
                    return (
                      manutencao.S_NOME !== 'Sem Operador' ?
                        <tr key={manutencao.ID_MANUTENCAO} id={manutencao.ID_MANUTENCAO}>
                          <td onClick={
                            () => exibirPDS(manutencao.ID_MANUTENCAO, manutencao['Frota'], manutencao['Quem Abriu'], manutencao['Data'], manutencao.CRACHA)}
                            style={{ cursor: 'pointer' }}
                            id={manutencao.ID_MANUTENCAO}>PDS</td>
                          <td id={manutencao.ID_VEICULO}>{manutencao['Frota']}</td>
                          <td id={manutencao['Tipo Maquina']}>{manutencao['Tipo Maquina']}</td>
                          <td>Chamado</td>
                          <td id={manutencao['Data']}>{manutencao['Data']}</td>
                          <td id={manutencao['Quem Abriu']}>{manutencao['Quem Abriu']}</td>
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
      </main>
    );
  }
}