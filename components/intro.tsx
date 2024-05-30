import { CMS_NAME } from '../lib/constants'
import Image from 'next/image'

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <Image src="/assets/icons/noun-campground-209.svg" height={64} width={64} alt="Home" />
      <h1 className="text-6xl md:text-6xl font-bold tracking-tighter leading-tight md:pr-4">
        infil00p.org
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Personal blog of Joe Bowser
      </h4>
    </section>
  )
}

export default Intro
