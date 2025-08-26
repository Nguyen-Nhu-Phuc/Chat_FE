import { getCookie } from 'cookies-next';

// import { decodeToken } from '@/libs/crypto';
import api from '../index'
// import axios from '../axios';

interface IRegister {
  firstName: string
  lastName: string
  dob: string
  phone: string
  gender: string
  password: string
}

export const RegisterApi = async ({
  firstName,
  lastName,
  dob,
  phone,
  gender,
  password,
}: IRegister) => {
  const body = { firstName, lastName, dob, phone, gender, password }

  const response = await api.post(`/api/users/register`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}

interface ILogin {
  phone: string
  password: string
}

export const LoginApi = async ({ phone, password }: ILogin) => {
  const body = { phone, password }

  const response = await api.post(`/api/users/login`, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}

interface IUpdateProfile {
  user: string
  bio?: string
  address?: string
  status?: string
}

export const UpdateProfileApi = async ({ user, bio, address, status }: IUpdateProfile) => {
  try {
    const token = getCookie('accessToken')

    if (!token) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
    }

    if (!user) throw new Error('User ID là bắt buộc')

    const body = {
      user,
      bio: bio || '',
      address: address || '',
      status: status || '',
    }

    const response = await api.patch(`/api/users/profile`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}
