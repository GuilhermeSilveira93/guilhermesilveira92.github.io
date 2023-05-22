const express = require('express')
const  manutencao  = require('../controllers/manutencao')
const rotas = express.Router()

/*API*/

rotas
  .post("/manutencoes_abertas.json", async (req, res) => {
    try {
      /*const { IDUSUARIO } = req.body.params.idUsuario[0]*/
      const resultado = await manutencao.manutencaoAberta()
      console.log(resultado)
      return res.status(200).json(resultado)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  })
module.exports = rotas