import Container from './container'
import Image from 'next/image'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-forest-100 border-t border-forest-300">
      <Container>
        <div className='py-10 grid gap-2 grid-cols-2 grid-rows-6 text-forest-700'>
          <div><a href="/" className="hover:text-forest-500">Home</a></div>
          <div></div>
          <div><a href="/about" className="hover:text-forest-500">About</a></div>
          <div></div>
          <div><a href="/posts/speaking" className="hover:text-forest-500">Speaking</a></div>
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