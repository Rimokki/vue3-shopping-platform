import request from '@/utils/request'
import type { OrderResult } from './checkout'

export interface OrderParams {
  orderState: number
  page: number
  pageSize: number
}

export interface UserOrder {
  counts: number
  page: number
  pages: number
  pageSize: number
  items: OrderResult[]
}

export const getUserOrderAPI = (params: OrderParams) => {
  return request.get<UserOrder>('/member/order', { params })
}
