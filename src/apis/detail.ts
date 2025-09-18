import request from '@/utils/request'
import type { GoodsItem } from './layout'

// 商品详情接口
export interface GoodsDetail {
  id: string // 商品id
  name: string // 商品名称
  spuCode: string // 商品spu编号
  desc: string // 商品描述
  price: string // 商品价格
  oldPrice: string // 商品原价
  discount: number // 折扣
  inventory: number // 商品库存
  brand: Brand // 商品品牌
  salesCount: number // 销量
  commentCount: number // 评价数量
  collectCount: number // 收藏数量
  mainVideos: string[] // 商品视频
  videoScale: number // 商品视频比例
  mainPictures: string[] // 商品图片
  specs: Spec[] // 商品规格
  skus: Sku[] // 商品SKU
  categories: Category[] // 商品分类
  details: Details // 商品详情
  isPreSale: boolean // 是否预售
  isCollect: unknown // 是否收藏
  recommends: unknown // 推荐商品
  userAddresses: unknown // 收货地址
  similarProducts: GoodsItem[] // 相似商品
  hotByDay: GoodsItem[] // 当天最热商品
  evaluationInfo: EvaluationInfo // 评价信息
}

// 品牌信息接口
export interface Brand {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type: unknown
  desc: unknown
  place: unknown
}

// 规格接口
export interface Spec {
  name: string
  id: string
  values: SpecValue[]
}

// 商品规格值接口
export interface SpecValue {
  name?: string
  picture?: string | null
  desc?: string
}

// SKU接口
export interface Sku {
  id: string
  skuCode: string
  price: string
  oldPrice: string
  inventory: number
  specs: SkuSpec[]
}

// SKU规格接口
export interface SkuSpec {
  name: string
  valueName?: string
}

// 分类接口
export interface Category {
  id: string
  name: string
  layer: number
  parent: CategoryParent | null
}

// 分类父级接口
export interface CategoryParent {
  id: string
  name: string
  layer: number
  parent: unknown
}

// 详情接口
export interface Details {
  pictures: string[]
  properties: Property[]
}

// 属性接口
export interface Property {
  name: string
  value: string
}

// 评价信息接口
export interface EvaluationInfo {
  id: string
  orderInfo: unknown
  member: unknown
  score: number
  tags: unknown
  content: string
  pictures: unknown
  officialReply: unknown
  praiseCount: number
  createTime: string
  praisePercent: number
}
export const getDetail = (id: string) => {
  return request.get<GoodsDetail>('/goods', { params: { id } })
}
