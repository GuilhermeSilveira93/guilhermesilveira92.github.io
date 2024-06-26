const {
  knex
} = require('../database')

module.exports = {
  async manutencaoAberta() {
    const resultado = await knex.raw(`
    select distinct ma.ID_MANUTENCAO,ma.ID_VEICULO,ma.ID_MOTORISTA_INCLUSAO,vei.s_numero_frota "Frota",tras.s_nome "Tipo Maquina", to_char(ma.D_INICIO,'DD/MM/YYYY HH:MM:SS') "Data", mot.s_nome "Quem Abriu", ib.s_codigo "CRACHA"
    from vw_manutencao ma, st_motorista mot, st_veiculo vei, st_tipo_rastreado tras,st_ibutton ib, st_ibutton_motorista ibmot
    where ma.s_aberta = 'S'
    and ma.id_motorista_inclusao = mot.id_motorista
    and ibmot.id_motorista = mot.id_motorista
    and ibmot.id_ibutton = ib.id_ibutton
    and ma.ID_VEICULO = vei.id_veiculo
    and vei.id_tipo_rastreado = tras.id_tipo_rastreado
    and ma.id_manutencao not in (select id_manutencao from st_pds)
    and ma.id_tipo_manutencao = 3
    `);
    return resultado
  },
  async tipoIntervencao() {
    const resultado = await knex.raw(`
    select id_tipo_intervencao, n_codigo "Codigo",S_NOME "Tipo Intervenção" from st_tipo_intervencao
    `)
    return resultado
  },
  async enviarPDS(id_tipo_intervencao, idManutencao, controlador, operadorTPA, portocel, jsl, horimetro, aexecutar,cracha) {
    await knex.transaction(async knex => {
      await knex.raw(`
        insert into st_pds(id_pds,id_manutencao,n_codigo_pds,s_controlador_carga,s_operador_tpa,s_portocel,
          s_jsl,n_horimetro,s_solicitante,d_data_abertura,s_servico_solicitacao)
          values
          (seq_stpds.nextval,${idManutencao},seq_stpds.currval,'${controlador}','${operadorTPA}','${portocel}',
            '${jsl}',${horimetro},'${cracha}',sysdate,'${aexecutar}')
            `);
      await knex.raw(`
      insert into st_pds_tipo_intervencao(id_pds_tipo_intervencao,id_pds,id_tipo_intervencao)
      (select seq_stpdstipointervencao.nextval,seq_stpds.currval,id_tipo_intervencao from (select id_tipo_intervencao
        from st_tipo_intervencao 
        where id_tipo_intervencao in (${id_tipo_intervencao})))
      `);
    });
  }
}