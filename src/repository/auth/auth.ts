// import { getCookie } from 'cookies-next';

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
