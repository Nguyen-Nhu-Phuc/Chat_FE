// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Home from '@/views/home/home'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Home to your account',
}

const HomePage = () => {
  return <Home />
}

export default HomePage
