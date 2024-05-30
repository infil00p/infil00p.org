import Container from './container'
import Image from 'next/image'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className='py-10 grid gap-2 grid-cols-2 grid-rows-6'>
          <div><a href="/">Home</a></div>
          <div></div>
          <div><a href="/about">About</a></div>
          <div></div>
          <div><a href="/posts/speaking">Speaking</a></div>
          <div></div>
          <div></div>
          <div></div>
          <div>Copyright 2024 Joe Bowser</div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
