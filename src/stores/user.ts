import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { loginAPI } from '@/apis/user'
import type { LoginParams, UserInfo } from '@/apis/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<UserInfo | null>(null)
    const getUserInfo = async (data: LoginParams) => {
      const res = await loginAPI(data)
      userInfo.value = res.result
    }

    const clearUserInfo = () => {
      userInfo.value = null
    }

    const isLogin = computed(() => {
      return !!userInfo.value?.token
    })

    return { userInfo, getUserInfo, isLogin, clearUserInfo }
  },
  { persist: true }
)
