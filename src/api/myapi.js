import axios from 'axios'
export function fetchList(query) {
  return axios.get('http://bore.pub:4090/classify', {
    method: 'get',
    params: query
  })
}
