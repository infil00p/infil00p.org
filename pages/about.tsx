import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import AboutInfo from '../components/about_info'


export default function About() {
    return (
        <>
          <Layout>
            <Head>
              <title>{`${CMS_NAME}`}</title>
            </Head>
            <Container>
              <Intro />
              <AboutInfo name='Joe Bowser' picture='/assets/blog/authors/joe.png'/>
            </Container>
          </Layout>
        </>
      )
}