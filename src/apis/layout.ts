import request from '@/utils/request'

export interface Category {
  id: string
  name: string
  picture: string | null
  children: CategoryChild[]
  goods?: GoodsItem[]
}

export interface CategoryChild {
  id: string
  name: string
  picture: string
  parentId: string
  parentName: string
  goods: GoodsItem[]
  categories: null | unknown[]
  brands: null | unknown[]
  saleProperties: null | unknown[]
}

export interface GoodsItem {
  id: string
  name: string
  desc: string
  price: number
  picture: string
  discount?: unknown
  orderNum: number
}

export const getCategoryAPI = () => {
  return request.get<Category[]>('/home/category/head')
}
