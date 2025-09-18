import request from '@/utils/request'
import type { Category, CategoryChild, GoodsItem } from '@/apis/layout'

export interface CategoryRequestData {
  categoryId: string
  page: number
  pageSize: number
  sortField: string
}

export interface SubCategoryResult {
  counts: number
  pages: number
  page: number
  pageSize: number
  items: GoodsItem[]
}

export const getCategoryAPI = (id: string) => {
  return request.get<Category>('/category', { params: { id } })
}

export const getCategoryFilterAPI = (id: string) => {
  return request.get<CategoryChild>('/category/sub/filter', { params: { id } })
}

export const getSubCategoryAPI = (data: CategoryRequestData) => {
  return request.post<SubCategoryResult>('/category/goods/temporary', data)
}
