import {
  tiposIntervencao,
  inspecaoQualidadeServico
} from "./dadosPDS.js";
let formularioOperador = document.querySelector('#formularioOperador')
let formularioManutencao = document.querySelector('#formularioManutencao')

tiposIntervencao.forEach((valores, index) => {
  let tr = document.createElement('tr')
  tr.setAttribute('class', 'linhas')
  const tdCodigo = document.createElement('td')
  tdCodigo.setAttribute('class', 'codigo')
  const tdTipoIntervencao = document.createElement('td')
  tdTipoIntervencao.setAttribute('class', 'tipointervencao')
  const checkbox = document.createElement('input')
  const checkboxLabel = document.createElement('label')

  checkbox.setAttribute('type', 'checkbox')
  if (index % 3 === 0) {
    checkbox.setAttribute('checked','true')
  }
  checkbox.setAttribute('id', valores.codigo)
  checkboxLabel.setAttribute('for', `${valores.codigo}`)

  if (index < tiposIntervencao.length / 3) {
    
    checkboxLabel.append(valores.itens)
    tdCodigo.append(valores.codigo)
    tdTipoIntervencao.append(checkbox)

    tdTipoIntervencao.append(checkboxLabel)
    tr.appendChild(tdCodigo)
    tr.appendChild(tdTipoIntervencao)
    formularioOperador.append(tr)
  } else {
    const linhas = document.getElementsByClassName('linhas')
    for (let index = 0; index < linhas.length; index++) {
      const valor = linhas[index];
      if (valor.children.length === 2) {
        checkboxLabel.append(valores.itens)
        checkbox.append(valores.itens)
        tdCodigo.append(valores.codigo)
        tdTipoIntervencao.append(checkbox)
        tdTipoIntervencao.append(checkboxLabel)
        valor.appendChild(tdCodigo)
        valor.appendChild(tdTipoIntervencao)
        formularioOperador.append(valor)
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
        formularioOperador.append(valor)
        break
      }
    }
  }
})
inspecaoQualidadeServico.forEach((valores, index) => {
  let tr = document.createElement('tr')
  tr.setAttribute('class', 'linhas2')

  const tdConforme = document.createElement('td')
  tdConforme.setAttribute('class', 'tdConforme')
  const chkconforme = document.createElement('input')
  chkconforme.setAttribute('type', 'radio')
  chkconforme.setAttribute('id', valores.Id)
  chkconforme.setAttribute('name', valores.Item)

  const tdNaoConforme = document.createElement('td')
  tdNaoConforme.setAttribute('class', 'tdNaoConforme')
  const chkNaoConforme = document.createElement('input')
  chkNaoConforme.setAttribute('type', 'radio')
  chkNaoConforme.setAttribute('id', valores.Id)
  chkNaoConforme.setAttribute('name', valores.Item)

  const tdNaoAplicado = document.createElement('td')
  tdNaoAplicado.setAttribute('class', 'tdNaoAplicado')
  const chkNaoAplicado = document.createElement('input')
  chkNaoAplicado.setAttribute('type', 'radio')
  chkNaoAplicado.setAttribute('id', valores.Id)
  chkNaoAplicado.setAttribute('name', valores.Item)

  const tdItens = document.createElement('td')
  tdItens.setAttribute('class', 'tdItens')

  if (index < inspecaoQualidadeServico.length / 3) {
    tdConforme.append(chkconforme)
    tdNaoConforme.append(chkNaoConforme)
    tdNaoAplicado.append(chkNaoAplicado)
    tdItens.append(valores.Item)
    tr.appendChild(tdConforme)
    tr.appendChild(tdNaoConforme)
    tr.appendChild(tdNaoAplicado)
    tr.appendChild(tdItens)
    formularioManutencao.append(tr)
  } else {

    const linhas2 = document.getElementsByClassName('linhas2')

    for (let index = 0; index < linhas2.length; index++) {
      const valor = linhas2[index];
      if (valor.children.length === 4) {
        tdConforme.append(chkconforme)
        tdNaoConforme.append(chkNaoConforme)
        tdNaoAplicado.append(chkNaoAplicado)
        tdItens.append(valores.Item)
        valor.appendChild(tdConforme)
        valor.appendChild(tdNaoConforme)
        valor.appendChild(tdNaoAplicado)
        valor.appendChild(tdItens)
        formularioManutencao.append(valor)
        break
      } else
      if (valor.children.length >= 4) {
        tdItens.append(valores.Item)
        if (valores.Item !== ''){
          tdConforme.append(chkconforme)
          tdNaoConforme.append(chkNaoConforme)
          tdNaoAplicado.append(chkNaoAplicado)
        }

        valor.appendChild(tdConforme)
        valor.appendChild(tdNaoConforme)
        valor.appendChild(tdNaoAplicado)
        valor.appendChild(tdItens)
        formularioManutencao.append(valor)
        break
      }
    }
  }
})