import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row ">
          Copyright 2024 Joe Bowser
        </div>
      </Container>
    </footer>
  )
}

export default Footer
