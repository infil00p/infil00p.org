import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from 'mdast'

const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
const geojsonRegex = /```geojson\n([\s\S]*?)\n```/g

const replaceYouTubeLinks: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, ['text', 'html'], (node: any) => {
      if (node.type === 'text') {
        // Handle direct YouTube URLs
        const matches = node.value.match(youtubeRegex)
        if (matches) {
          const videoId = matches[1]
          node.type = 'html'
          node.value = `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
        }
      } else if (node.type === 'html') {
        // Handle YouTube component
        if (node.value.startsWith('<YouTube') && node.value.includes('video_id="')) {
          const videoIdMatch = node.value.match(/video_id="([^"]+)"/)
          if (videoIdMatch) {
            const videoId = videoIdMatch[1]
            node.value = `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
          }
        }
      }
    })
  }
}

const replaceGeoJSON: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'code', (node: any) => {
      if (node.lang === 'geojson') {
        try {
          const geojsonData = JSON.parse(node.value)
          node.type = 'html'
          node.value = `<div id="map-${Math.random().toString(36).substr(2, 9)}" class="map-container" data-geojson='${JSON.stringify(geojsonData)}'></div>`
        } catch (e) {
          console.error('Failed to parse GeoJSON:', e)
          node.type = 'html'
          node.value = '<div class="error">Invalid GeoJSON data</div>'
        }
      }
    })
  }
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, {
      sanitize: false // Disable sanitization to allow HTML nodes
    })
    .use(replaceYouTubeLinks)
    .use(replaceGeoJSON)
    .process(markdown)

  // Process code blocks to add language classes and mark for highlighting
  const processedHtml = result.toString()
    .replace(/<pre><code class="language-(\w+)">/g, '<pre><code class="hljs language-$1" data-language="$1">')
    .replace(/<pre><code>/g, '<pre><code class="hljs">') // Add hljs class to code blocks without language
    .replace(/<pre><code class="hljs language-(\w+)">([\s\S]*?)<\/code><\/pre>/g, (match, lang, code) => {
      // Ensure the code block has the proper structure for highlighting
      return `<pre><code class="hljs language-${lang}" data-language="${lang}">${code.trim()}</code></pre>`
    })

  return processedHtml
}