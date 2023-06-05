import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:9100/',
  //baseURL: 'https://secure.softrack.com.br/portocel/pds',
})
