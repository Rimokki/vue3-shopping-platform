import request from '@/utils/request'
import type { GoodsItem } from '@/apis/layout'

export interface Banner {
  id: string
  imgUrl: string
  hrefUrl: string
  type: string
}

export interface HotGoodsItem {
  id: string
  picture: string
  title: string
  alt: string
}

export interface GoodsList {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: GoodsListChildren[]
  goods: GoodsItem[]
}

export interface GoodsListChildren {
  id: string
  name: string
  layer: number
  parent: unknown | null
}

export const getHomeBanner = (distributionSite?: string) => {
  distributionSite = distributionSite ?? '1'
  return request.get<Banner[]>('/home/banner', { params: { distributionSite } })
}

export const getNewGoods = () => {
  return request.get<GoodsItem[]>('/home/new')
}

export const getHotGoods = () => {
  return request.get<HotGoodsItem[]>('/home/hot')
}

export const getGoodsList = () => {
  return request.get<GoodsList[]>('/home/goods')
}
