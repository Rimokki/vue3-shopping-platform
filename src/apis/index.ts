import request from '@/utils/request'

export const getHomeMultidata = () => {
  return request.get('/home/category/head')
}
