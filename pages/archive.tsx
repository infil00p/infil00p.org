import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../interfaces/post'
import Header from '../components/header'
import PostPreview from '../components/post-preview'



type Props = {
    allPosts: Post[]
  }
  
  export default function Archive({ allPosts }: Props) {
    const morePosts = allPosts
    return (
      <>
        <Layout>
          <Head>
                <title>{`${CMS_NAME}`}</title>
          </Head>
          <Header></Header>        
          <Container>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Container>
        </Layout>
      </>
    )
  }
  
  export const getStaticProps = async () => {
    const allPosts = getAllPosts([
      'title',
      'date',
      'slug',
      'author',
      'coverImage',
      'excerpt',
    ])
  
    return {
      props: { allPosts },
    }
  }
  