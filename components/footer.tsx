import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row ">
          <ul className="mx-4 font-bold">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/speaking">Speaking</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
