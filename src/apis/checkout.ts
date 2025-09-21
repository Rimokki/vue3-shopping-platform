import request from '@/utils/request'
import type { Sku } from './detail'

export interface CheckoutInfo {
  userAddresses: UserAddress[]
  goods: CheckoutGoods[]
  summary: Summary
}

export interface UserAddress {
  id: string
  receiver: string
  contact: string
  provinceCode: string
  cityCode: string
  countyCode: string
  address: string
  isDefault: number
  fullLocation: string
  postalCode: string | null
  addressTags: string | null
}

export interface CheckoutGoods {
  id: string
  name: string
  picture: string
  count: number
  skuId: string
  attrsText: string
  price: string
  payPrice: string
  totalPrice: string
  totalPayPrice: string
}

export interface Summary {
  goodsCount: number
  totalPrice: number
  totalPayPrice: number
  postFee: number
  discountPrice: number
}

export interface OrderParams {
  deliveryTimeType: number
  payType: number
  payChannel: number
  buyerMessage: ''
  goods: {
    skuId: string
    count: number
  }[]

  addressId: string
}

export interface OrderResult {
  id: string
  createTime: string
  payType: number
  orderState: number
  payLatestTime: string
  postFee: number
  payMoney: number
  totalMoney: number
  totalNum: number
  skus: Sku[]
  payChannel: number
  countdown: number
}

export const getCheckoutInfoAPI = () => request.get<CheckoutInfo>('/member/order/pre')

export const createOrderAPI = (data: OrderParams) =>
  request.post<OrderResult>('/member/order', data)
