import request from '@/utils/request'
import type { CartItem } from '@/stores/cart'

interface CartParams {
  skuId: string
  count: number
  selected?: boolean
}
export const insertCartAPI = (data: CartParams) => {
  return request.post('/member/cart', data)
}

export const getCartListAPI = () => {
  return request.get<CartItem[]>('/member/cart')
}

export const deleteCartAPI = (ids: string[]) => {
  return request.delete('/member/cart', { data: { ids } })
}

export const mergeCartAPI = (data: CartParams[]) => {
  return request.post('/member/cart/merge', data)
}
