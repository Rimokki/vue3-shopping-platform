import { ref, onMounted } from 'vue'
import { getHomeBanner } from '@/apis/home'
import type { Banner } from '@/apis/home'
import type { Ref } from 'vue'

export const useBanner = () => {
  const bannerList = ref<Banner[]>([])
  const getBanner = async () => {
    const res = await getHomeBanner('2')
    bannerList.value = res.result
  }

  onMounted(() => getBanner())

  return {
    bannerList: bannerList as Ref<Banner[]>
  }
}
