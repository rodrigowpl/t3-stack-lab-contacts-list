import { type AppType } from 'next/app'
import { api } from '@/utils/api'
import '@/styles/globals.css'

import { Toaster } from '@/components/ui/toaster'

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  )
}

export default api.withTRPC(MyApp)
