import type { App } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const lazyPlugin = {
  install(app: App) {
    app.directive('img-lazy', {
      mounted(el, binding) {
        const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        })
      }
    })
  }
}
