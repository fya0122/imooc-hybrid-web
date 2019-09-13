import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://api.imooc.hybrid.lgdsunday.club/'
})

service.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = ''
  } else {
    config.params = {
      token: ''
    }
  }
  return config
})

service.interceptors.response.use((response) => {
  return response
}, (error) => {
  return Promise.reject(error)
})

export default service
