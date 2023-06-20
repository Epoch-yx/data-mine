import axios from 'axios'
import REST_URLS from './index'

export const aprior = (data) => {
  return axios({
    url: REST_URLS.Aprior,
    method: 'post',
    data
  })
}
