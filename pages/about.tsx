import Container from '../components/container'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import AboutInfo from '../components/about_info'
import Header from '../components/header'


export default function About() {
    return (
        <>
          <Layout>
            <Head>
              <title>{`${CMS_NAME}`}</title>
            </Head>
            <Header />
            <Container>
              <article className="mb-32">
              <AboutInfo name='Joe Bowser' picture='/assets/blog/authors/joe.png'/>
              </article>
            </Container>
          </Layout>
        </>
      )
}