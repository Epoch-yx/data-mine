export default {
  method: 'get',
  // 基础url前缀
  baseUrl: '/',
  // 请求头信息
  headers: {
    'Content-type': 'application/json;charset=UTF-8'
    // 'Content-type': 'application/x-www-form-urlencoded'
  },
  // 参数
  data: {},
  // 设置超时时间,单位毫秒
  timeout: 5000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json',
  crossDomain: true
}
