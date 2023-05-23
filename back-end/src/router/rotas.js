const express = require('express')
const  manutencao  = require('../controllers/manutencao')
const rotas = express.Router()

/*API*/

rotas
  .get("/manutencoes_abertas.json", async (req, res) => {
    try {
      /*const { IDUSUARIO } = req.body.params.idUsuario[0]*/
      const resultado = await manutencao.manutencaoAberta()
      return res.status(200).json(resultado)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  rotas.get("/tipo_intervencao.json", async (req, res) => {
    try {
      const resultado = await manutencao.tipoIntervencao()
      return res.status(200).json(resultado)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
  rotas.post("/registrarntervencao.json", async (req, res) => {
    try {
      const {id_tipo_intervencao,idManutencao,controlador,operadorTPA,portocel,jsl,horimetro,aexecutar} = req.body.params
      console.log(req.body.params)
      const resultado = await manutencao.enviarPDS(id_tipo_intervencao,idManutencao,controlador,operadorTPA,portocel,jsl,horimetro,aexecutar)
      return res.status(200).json(resultado)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })
module.exports = rotas