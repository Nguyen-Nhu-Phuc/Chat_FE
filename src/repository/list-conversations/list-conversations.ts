import { getCookie } from 'cookies-next'
import api from '../index'


export const listConversations = async () => {
    try {

        const token = getCookie('accessToken')

        if (!token) {
            throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
        }

        const response = await api.get(`/api/friends/list-conversations`, {
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