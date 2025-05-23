import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'
import type { Plugin } from 'unified'
import type { Root } from '@types/unist'

const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
const geojsonRegex = /```geojson\n([\s\S]*?)\n```/g

const replaceYouTubeLinks: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'text', (node: any) => {
      const matches = node.value.match(youtubeRegex)
      if (matches) {
        const videoId = matches[1]
        node.type = 'html'
        node.value = `<div class="youtube-embed"><iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>`
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
    .use(html)
    .use(replaceYouTubeLinks)
    .use(replaceGeoJSON)
    .process(markdown)
  
  return result.toString()
}