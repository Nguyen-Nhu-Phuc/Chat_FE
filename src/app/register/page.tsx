// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Register from '@/views/auth/register'

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register to your account',
}

const RegisterPage = () => {
  return <Register />
}

export default RegisterPage
