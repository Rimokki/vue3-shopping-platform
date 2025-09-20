import { computed, onUnmounted, ref } from 'vue'
import { dayjs } from 'element-plus'

export const useCountDown = () => {
  const time = ref<number>(1800)
  let timer: number | null = null

  const formatedTime = computed(() => {
    return dayjs.unix(time.value).format('mm分ss秒')
  })
  const start = (currentTime: number) => {
    time.value = currentTime
    timer = setInterval(() => {
      time.value--
    }, 1000)
  }

  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  })

  return { formatedTime, start }
}
