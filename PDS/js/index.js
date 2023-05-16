import {manutencoes} from "./dadosPDS.js";
let divTipoIntervencao = document.querySelector('tbody')
let tr = document.createElement('tr')

manutencoes.forEach((valores, index) => {
  tr = document.createElement('tr')
  tr.setAttribute('class', 'linhas')

  const tdFrota = document.createElement('td')
  tdFrota.setAttribute('class', 'frota')

  const tdTipoMaquina = document.createElement('td')
  tdTipoMaquina.setAttribute('class', 'tipointervencao')

  const tdTipoManutencao = document.createElement('td')
  tdTipoManutencao.setAttribute('class', 'tdTipoManutencao')

  const tdData = document.createElement('td')
  tdData.setAttribute('class', 'tdData')

  const tdQuemAbriu = document.createElement('td')
  tdQuemAbriu.setAttribute('class', 'tdQuemAbriu')
  
  const tdPds = document.createElement('td')
  tdPds.setAttribute('class', 'tdPds')
  tdPds.style.cursor = 'pointer'
  tdPds.style.textAlign = 'center'
  tdPds.style.fontSize = '10px'
  tdFrota.append(valores.Frota)
  tdTipoMaquina.append(valores.tipoMaquina)
  tdTipoManutencao.append(valores.tipoManutencao)
  tdData.append(valores.data)
  tdQuemAbriu.append(valores.quemAbriu)
  tdPds.append(valores.pds)
  tdPds.onclick = () =>{
    sessionStorage.clear()
    sessionStorage.setItem('frota',valores.Frota)
    sessionStorage.setItem('cracha',valores.quemAbriu)
    sessionStorage.setItem('data',valores.data)
    window.location.href = "./formularioOperadores.html"
  }
  tr.appendChild(tdPds)
  tr.appendChild(tdFrota)
  tr.appendChild(tdTipoMaquina)
  tr.appendChild(tdTipoManutencao)
  tr.appendChild(tdData)
  tr.appendChild(tdQuemAbriu)
  
  divTipoIntervencao.append(tr)
})

function myfunction() {
  window.location.href = "./formularioOperadores.html"
}