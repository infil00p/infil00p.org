import { remark } from 'remark'
import html from 'remark-html'
import { visit } from 'unist-util-visit'

const youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/

function replaceYouTubeLinks() {
  return (tree: any) => {
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

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html)
    .use(replaceYouTubeLinks)
    .process(markdown)
  
  return result.toString()
}