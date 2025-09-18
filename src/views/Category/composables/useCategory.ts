import { ref } from 'vue'
import { getCategoryAPI } from '@/apis/category'
import type { Category } from '@/apis/layout'
import type { Ref } from 'vue'

export const useCategory = () => {
  const categoryData = ref<Category | null>(null)

  const getCategory = async (id: string) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  return {
    categoryData: categoryData as Ref<Category | null>,
    getCategory
  }
}
