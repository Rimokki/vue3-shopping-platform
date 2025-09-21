import request from '@/utils/request'
import type { GoodsItem } from './layout'

export interface LoginParams {
  account: string
  password: string
}

export interface UserInfo {
  id: string
  account: string
  mobile: string
  token: string
  avatar: string
  nickname: string
  gender: string
  birthday: string
  cityCode: string
  provinceCode: string
  profession: string
}

export const loginAPI = (data: LoginParams) => {
  return request.post<UserInfo>('/login', data)
}

export const getLikeListAPI = () => {
  return request.get<GoodsItem[]>('/goods/relevant')
}
