import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, getCartListAPI, deleteCartAPI } from '@/apis/cart'

export interface CartItem {
  id: string | undefined
  name: string | undefined
  picture: string | undefined
  price: string | undefined
  count: number
  skuId: string
  attrsText: string | undefined
  selected: boolean
}

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref<CartItem[]>([])
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo?.token)

    const updateCartList = async () => {
      const res = await getCartListAPI()
      cartList.value = res.result
    }
    const addCart = async (cartItem: CartItem) => {
      const { skuId, count } = cartItem
      if (isLogin.value) {
        await insertCartAPI({ skuId, count })
        updateCartList()
      } else {
        const item = cartList.value.find((item) => item.skuId === cartItem.skuId)
        if (item) {
          item.count += cartItem.count
        } else {
          cartList.value.push(cartItem)
        }
      }
    }

    const deleteCart = async (skuId: string) => {
      if (isLogin.value) {
        await deleteCartAPI([skuId])
        updateCartList()
      } else {
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    }

    const clearCart = () => {
      cartList.value = []
    }

    const singleCheck = (skuId: string, selected: boolean) => {
      // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
      const item = cartList.value.find((item) => item.skuId === skuId)
      if (item) item.selected = selected
    }

    const allCheck = (selected: boolean) => {
      // 把cartList中的每一项的selected都设置为当前的全选框状态
      cartList.value.forEach((item) => (item.selected = selected))
    }

    const totalCount = computed(() => cartList.value.reduce((total, item) => total + item.count, 0))
    const totalPrice = computed(() =>
      cartList.value.reduce((total, item) => {
        const price = item.price ? parseFloat(item.price) : 0
        return total + item.count * price
      }, 0)
    )
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((total, item) => total + item.count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((total, item) => {
          const price = item.price ? parseFloat(item.price) : 0
          return total + item.count * price
        }, 0)
    )
    const isAllChecked = computed(() => cartList.value.every((item) => item.selected))

    return {
      cartList,
      addCart,
      deleteCart,
      updateCartList,
      singleCheck,
      allCheck,
      clearCart,
      totalCount,
      totalPrice,
      selectedCount,
      selectedPrice,
      isAllChecked
    }
  },
  { persist: true }
)
