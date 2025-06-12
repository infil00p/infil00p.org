import { AppProps } from 'next/app'
import '../styles/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import cmake from 'highlight.js/lib/languages/cmake'

// Register CMake language
hljs.registerLanguage('cmake', cmake)

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    hljs.highlightAll()
  }, [])

  return <Component {...pageProps} />
}
