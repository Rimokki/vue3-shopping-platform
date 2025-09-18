import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'
import { ref } from 'vue'
import type { Category } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref<Category[]>([])
  const getCategoryList = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return { categoryList, getCategoryList }
})
