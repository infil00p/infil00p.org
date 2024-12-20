import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
      <GoogleAnalytics gaId="G-504M4XPRLD" />
      <SpeedInsights />
    </>
  )
}

export default Layout
