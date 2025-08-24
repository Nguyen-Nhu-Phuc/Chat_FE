import axios from 'axios'
import { setCookie, getCookie, deleteCookie } from 'cookies-next'

const baseurl = process.env.NEXT_PUBLIC_FRAPPE_URL

const instance = axios.create({
  baseURL: baseurl,
})

instance.interceptors.response.use(
  (response) => {
    deleteCookie('error-flag')

    return response
  },
  async (error) => {
    if (!error.response) {
      await setCookie('error-message', 'error_connect')
      const currentFlag = await getCookie('error-flag')

      if (currentFlag !== '1') {
        await setCookie('error-flag', '1')
      }
    }

    return Promise.reject(error)
  },
)

export default instance
