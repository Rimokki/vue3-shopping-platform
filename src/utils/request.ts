import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

interface ApiResponse<T> {
  code: number
  msg: string
  result: T
}

class Request {
  instance: AxiosInstance
  baseConfig: AxiosRequestConfig = { baseURL, timeout: 100000 }
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore()
        if (userStore.userInfo?.token) {
          config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
        }
        return config
      },
      (err: AxiosError) => {
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data
      },
      (err: AxiosError) => {
        const userStore = useUserStore()
        ElMessage.error((err.response?.data as { message?: string })?.message || '请求失败')
        if (err.response?.status === 401) {
          userStore.clearUserInfo()
          router.push('/login')
        }
        return Promise.reject(err)
      }
    )
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.get(url, config)
  }

  public post<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = unknown>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
export { baseURL }
export type { ApiResponse }
