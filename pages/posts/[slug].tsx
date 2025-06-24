import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getPostBySlug, getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import markdownToHtml from '../../lib/markdownToHtml'
import type PostType from '../../interfaces/post'
import MapboxMap from '../../components/map'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  const title = `${post.title}`

  useEffect(() => {
    const mapContainers = document.querySelectorAll('.map-container')
    const roots: { [key: string]: any } = {}

    mapContainers.forEach((container, index) => {
      try {
        const geojson = JSON.parse(container.getAttribute('data-geojson') || '{}')
        console.log('Processing GeoJSON:', geojson)
        
        if (geojson.features && geojson.features.length > 0) {
          const feature = geojson.features[0]
          const coordinates = feature.geometry.coordinates
          
          console.log('Feature type:', feature.geometry.type)
          console.log('Coordinates:', coordinates)
          
          // Validate coordinates
          if (!coordinates || coordinates.length === 0) {
            throw new Error('No coordinates found in GeoJSON')
          }
          
          // Find valid center coordinates and calculate bounds
          let center: [number, number] = [-122.486052, 37.830348] // Default fallback
          let bounds: [[number, number], [number, number]] | undefined = undefined
          
          // Helper function to extract coordinates from different geometry types
          const extractAllCoordinates = (geometry: any): [number, number][] => {
            const coords: [number, number][] = []
            
            if (geometry.type === 'LineString') {
              geometry.coordinates.forEach((coord: any) => {
                if (Array.isArray(coord) && coord.length >= 2) {
                  coords.push([parseFloat(coord[0]), parseFloat(coord[1])])
                }
              })
            } else if (geometry.type === 'MultiLineString') {
              geometry.coordinates.forEach((lineString: any) => {
                if (Array.isArray(lineString)) {
                  lineString.forEach((coord: any) => {
                    if (Array.isArray(coord) && coord.length >= 2) {
                      coords.push([parseFloat(coord[0]), parseFloat(coord[1])])
                    }
                  })
                }
              })
            } else if (geometry.type === 'Point') {
              if (Array.isArray(geometry.coordinates) && geometry.coordinates.length >= 2) {
                coords.push([parseFloat(geometry.coordinates[0]), parseFloat(geometry.coordinates[1])])
              }
            }
            
            return coords
          }
          
          // Extract all coordinates
          const allCoords = extractAllCoordinates(feature.geometry)
          console.log('All coordinates:', allCoords.length)
          
          if (allCoords.length > 0) {
            // Calculate bounding box
            let minLng = allCoords[0][0]
            let maxLng = allCoords[0][0]
            let minLat = allCoords[0][1]
            let maxLat = allCoords[0][1]
            
            allCoords.forEach(([lng, lat]) => {
              minLng = Math.min(minLng, lng)
              maxLng = Math.max(maxLng, lng)
              minLat = Math.min(minLat, lat)
              maxLat = Math.max(maxLat, lat)
            })
            
            bounds = [[minLng, minLat], [maxLng, maxLat]]
            console.log('Calculated bounds:', bounds)
            
            // Use center of bounds for fallback
            center = [(minLng + maxLng) / 2, (minLat + maxLat) / 2]
            console.log('Using bounds center:', center)
          } else {
            // Fallback to original logic if no coordinates found
            if (feature.geometry.type === 'LineString') {
              // Use middle coordinate for LineString
              const midIndex = Math.floor(coordinates.length / 2)
              const midCoord = coordinates[midIndex]
              console.log('LineString mid coordinate:', midCoord)
              
              if (Array.isArray(midCoord) && midCoord.length >= 2) {
                const lng = parseFloat(midCoord[0])
                const lat = parseFloat(midCoord[1])
                if (!isNaN(lng) && !isNaN(lat)) {
                  center = [lng, lat]
                  console.log('Using LineString center:', center)
                }
              }
            } else if (feature.geometry.type === 'MultiLineString') {
              // Use middle coordinate from the first LineString in MultiLineString
              console.log('MultiLineString coordinates:', coordinates)
              
              if (coordinates.length > 0 && Array.isArray(coordinates[0])) {
                const firstLineString = coordinates[0]
                const midIndex = Math.floor(firstLineString.length / 2)
                const midCoord = firstLineString[midIndex]
                console.log('MultiLineString mid coordinate:', midCoord)
                
                if (Array.isArray(midCoord) && midCoord.length >= 2) {
                  const lng = parseFloat(midCoord[0])
                  const lat = parseFloat(midCoord[1])
                  if (!isNaN(lng) && !isNaN(lat)) {
                    center = [lng, lat]
                    console.log('Using MultiLineString center:', center)
                  }
                }
              }
            } else if (feature.geometry.type === 'Point') {
              // Use first coordinate for Point
              console.log('Point coordinates:', coordinates)
              
              if (coordinates.length >= 2) {
                const lng = parseFloat(coordinates[0])
                const lat = parseFloat(coordinates[1])
                if (!isNaN(lng) && !isNaN(lat)) {
                  center = [lng, lat]
                  console.log('Using Point center:', center)
                }
              }
            }
          }
          
          console.log('Final center:', center)
          console.log('Final bounds:', bounds)
          
          // Create a unique ID for this map
          const mapId = `map-${index}-${Date.now()}`
          container.id = mapId
          
          // Create root and render the map component
          const root = createRoot(container)
          roots[mapId] = root
          
          root.render(<MapboxMap geojson={geojson} center={center} bounds={bounds} />)
        }
      } catch (error) {
        console.error('Error rendering map:', error)
        container.innerHTML = '<div class="error p-4 text-center text-red-600">Error loading map: Invalid GeoJSON data</div>'
      }
    })

    // Cleanup function to unmount React components
    return () => {
      Object.keys(roots).forEach(mapId => {
        try {
          roots[mapId].unmount()
        } catch (error) {
          console.error('Error unmounting map:', error)
        }
      })
    }
  }, [post])

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32 mt-16">
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}