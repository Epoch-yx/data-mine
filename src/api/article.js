import request from '@/utils/request'
import axios from 'axios'
// export function fetchList(query) {
//   return request({
//     url: '/vue-element-admin/article/list',
//     // url: 'http://bore.pub:4090/classify',
//     method: 'get',
//     params: query
//   })
// }
// export function fetchList(query) {
//   return axios.get('http://bore.pub:4090/classify', {
//     method: 'get',
//     params: {
//       page: query.page,
//       limit: query.limit
//     }
//   })
// }
export function fetchList(query) {
  return axios.get('http://bore.pub:4090/classify', {
    method: 'get',
    params: query
  })
}
export function fetchList2(query) {
  return axios.post('http://bore.pub:4090/regression', {
    method: 'post',
    params: query
  })
}
export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
