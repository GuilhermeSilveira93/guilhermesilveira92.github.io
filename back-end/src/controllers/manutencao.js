const {
  knex
} = require('../database')

module.exports = {
  async manutencaoAberta() {
    const resultado = await knex.raw(`
        select distinct ma.ID_MANUTENCAO,ma.ID_VEICULO,ma.ID_MOTORISTA_INCLUSAO,vei.s_numero_frota "Frota",tras.s_nome "Tipo Maquina", to_char(ma.D_INICIO,'DD/MM/YYYY HH:MM:SS') "Data", mot.s_nome "Quem Abriu"
        from vw_manutencao ma, st_motorista mot, st_veiculo vei, st_tipo_rastreado tras
        where ma.s_aberta = 'S'
        and ma.id_tipo_manutencao = 3
        and ma.id_motorista_inclusao = mot.id_motorista
        and ma.ID_VEICULO = vei.id_veiculo
        and vei.id_tipo_rastreado = tras.id_tipo_rastreado
    `);
    return resultado
  }
}