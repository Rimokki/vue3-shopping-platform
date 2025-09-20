import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginAPI } from '@/apis/user'
import type { LoginParams, UserInfo } from '@/apis/user'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/apis/cart'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const cartStore = useCartStore()
    const getUserInfo = async (data: LoginParams) => {
      const res = await loginAPI(data)
      userInfo.value = res.result
      await mergeCartAPI(
        cartStore.cartList.map((item) => ({
          skuId: item.skuId,
          count: item.count,
          selected: item.selected
        }))
      )
      cartStore.updateCartList()
    }

    const clearUserInfo = () => {
      userInfo.value = null
      cartStore.clearCart()
    }

    const isLogin = computed(() => {
      return !!userInfo.value?.token
    })

    return { userInfo, getUserInfo, isLogin, clearUserInfo }
  },
  { persist: true }
)
