import Container from './container'
import Image from 'next/image'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-20 flex flex-col lg:flex-row ">
          <ul className="flex flex-wrap items-center justify-center">
          <li><a href="/"><Image src="/assets/icons/noun-campground-209.svg" height={32} width={32} alt="Home"/>Home </a></li>
          <li><a href="/about"><Image src="/assets/icons/noun-library-191.svg" height={32} width={32} alt="About"/> About </a></li>
          <li><a href="/speaking"><Image src="/assets/icons/noun-amphitheater-323.svg" height={32} width={32} alt="Speaking"/>Speaking</a></li>
        </ul>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
