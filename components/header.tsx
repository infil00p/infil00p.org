import Link from 'next/link'
import Image from 'next/image'
import Container from './container'

const Header = () => {
  return (
      <nav className="bg-forest-100 border-t border-forest-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="/assets/icons/noun-campground-209.svg" height={32} width={32} alt="Home"/>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-forest-700">infil00p.org</span>
          </a>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-forest-200 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">              
              <li>
                <a href="/posts/speaking" className="block py-2 px-3 text-forest-700 rounded hover:bg-forest-200 md:hover:bg-transparent md:border-0 md:hover:text-forest-500 md:p-0">Speaking</a>
              </li>
              <li>
                <a href="/about" className="block py-2 px-3 text-forest-700 rounded hover:bg-forest-200 md:hover:bg-transparent md:border-0 md:hover:text-forest-500 md:p-0">About</a>
              </li>
              <li>
                <a href="/archive" className="block py-2 px-3 text-forest-700 rounded hover:bg-forest-200 md:hover:bg-transparent md:border-0 md:hover:text-forest-500 md:p-0">Archive</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}

export default Header