import {
  tiposIntervencao
} from "./dadosPDS.js";
let divTipoIntervencao = document.querySelector('tbody')
let tr = document.createElement('tr')

tiposIntervencao.forEach((valores, index) => {
  tr = document.createElement('tr')
  tr.setAttribute('class', 'linhas')
  const tdCodigo = document.createElement('td')
  tdCodigo.setAttribute('class', 'codigo')
  const tdTipoIntervencao = document.createElement('td')
  tdTipoIntervencao.setAttribute('class', 'tipointervencao')
  const checkbox = document.createElement('input')
  const checkboxLabel = document.createElement('label')

  checkbox.setAttribute('type', 'checkbox')
  checkbox.setAttribute('id', valores.codigo)
  checkboxLabel.setAttribute('for', `${valores.codigo}`)

  if (index < tiposIntervencao.length / 3) {
    checkboxLabel.append(valores.itens)
    tdCodigo.append(valores.codigo)
    tdTipoIntervencao.append(checkbox)
    tdTipoIntervencao.append(checkboxLabel)
    tr.appendChild(tdCodigo)
    tr.appendChild(tdTipoIntervencao)
    divTipoIntervencao.append(tr)
  } else {
    const linhas = document.getElementsByClassName('linhas')
    for (let index = 0; index < linhas.length; index++) {
      const valor = linhas[index];
      //console.log(`index: ${index} - Filhos: ${valor.children.length}`)
      if (valor.children.length === 2) {
        checkboxLabel.append(valores.itens)
        checkbox.append(valores.itens)
        tdCodigo.append(valores.codigo)
        tdTipoIntervencao.append(checkbox)
        tdTipoIntervencao.append(checkboxLabel)
        valor.appendChild(tdCodigo)
        valor.appendChild(tdTipoIntervencao)
        divTipoIntervencao.append(valor)
        break
      } else
      if (valor.children.length >= 2) {
        checkboxLabel.append(valores.itens)
        if (valores.itens !== '') {
          checkbox.append(valores.itens)
          tdTipoIntervencao.append(checkbox)
        }
        
        tdCodigo.append(valores.codigo)
        
        tdTipoIntervencao.append(checkboxLabel)
        valor.appendChild(tdCodigo)
        valor.appendChild(tdTipoIntervencao)
        divTipoIntervencao.append(valor)
        break
      }
    }
  }
})