import Mock from 'mockjs'

// 定义mock请求拦截
Mock.Mock('', 'get', function() {
  // 拦截到请求后的处理逻辑
  console.log('ok')
})
