import { Context } from '@nuxt/types'

export default function (context: Context) {
  const { $axios, $auth } = context
  $axios.interceptors.request.use(
    (config) => {
      if ($auth.user !== undefined) {
        if (($auth.user?.exp as number) < Date.now()) {
          $auth.refreshTokens()
        }
      } else {
        $auth.refreshTokens()
      }
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )
}
