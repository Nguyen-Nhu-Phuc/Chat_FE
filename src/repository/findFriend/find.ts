import { getCookie } from 'cookies-next'
import api from '../index'


export const findFriendApi = async (phone: string) => {
    try {

        const token = getCookie('accessToken')

        if (!token) {
            throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
        }

        const response = await api.get(`/api/friends/find-user/${phone}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    } catch (error) {
        console.error('Error fetching friends:', error)
        throw error
    }
}

export const checkFriendApi = async (phone: string) => {
    try {

        const token = getCookie('accessToken')

        if (!token) {
            throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
        }

        const response = await api.get(`/api/friends/check-friend/${String(phone)}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })

        return response.data
    } catch (error) {
        console.error('Error fetching friends:', error)
        throw error
    }
}