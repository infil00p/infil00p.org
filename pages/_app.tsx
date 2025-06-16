import { AppProps } from 'next/app'
import '../styles/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import cmake from 'highlight.js/lib/languages/cmake'
import cpp from 'highlight.js/lib/languages/cpp'
import kotlin from 'highlight.js/lib/languages/kotlin'
import objectivec from 'highlight.js/lib/languages/objectivec'

// Register languages
hljs.registerLanguage('cmake', cmake)
hljs.registerLanguage('cpp', cpp)
hljs.registerLanguage('kotlin', kotlin)
hljs.registerLanguage('objc', objectivec)

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Function to highlight code blocks
    const highlightCodeBlocks = () => {
      console.log('Attempting to highlight code blocks...')
      // Look for code blocks in both the markdown content and any other content
      const codeBlocks = document.querySelectorAll('pre code.hljs')
      console.log('Found code blocks:', codeBlocks.length)
      
      codeBlocks.forEach((block, index) => {
        const language = block.getAttribute('data-language') || block.className.replace('language-', '')
        console.log(`Code block ${index}:`, {
          classes: block.className,
          language,
          content: block.textContent?.substring(0, 50) + '...'
        })
        
        if (!block.classList.contains('hljs-highlighted')) {
          console.log(`Highlighting block ${index} with language ${language}...`)
          try {
            if (language && hljs.getLanguage(language)) {
              hljs.highlightElement(block as HTMLElement)
              block.classList.add('hljs-highlighted')
              console.log(`Successfully highlighted block ${index}`)
            } else {
              console.log(`Language ${language} not supported, using auto-detect`)
              hljs.highlightElement(block as HTMLElement)
              block.classList.add('hljs-highlighted')
            }
          } catch (error) {
            console.error(`Error highlighting block ${index}:`, error)
          }
        } else {
          console.log(`Block ${index} already highlighted`)
        }
      })
    }

    // Initial highlight
    highlightCodeBlocks()

    // Set up a MutationObserver to watch for changes in the document
    const observer = new MutationObserver((mutations) => {
      let shouldHighlight = false
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if any added nodes are code blocks or contain code blocks
          mutation.addedNodes.forEach((node) => {
            if (node instanceof HTMLElement) {
              if (node.matches('pre code.hljs') || node.querySelector('pre code.hljs')) {
                shouldHighlight = true
              }
            }
          })
        }
      })
      
      if (shouldHighlight) {
        console.log('New code blocks detected, re-running highlight...')
        highlightCodeBlocks()
      }
    })

    // Start observing the document body for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])

  return <Component {...pageProps} />
}
