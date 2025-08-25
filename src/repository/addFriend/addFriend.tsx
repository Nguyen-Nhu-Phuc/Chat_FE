import { getCookie } from 'cookies-next'
import api from '../index'

// Interface cho profile của bạn bè
export interface IProfile {
  _id: string
  avatar?: string
}

// Interface cho 1 bạn bè
export interface IFriend {
  _id: string
  firstName: string
  lastName: string
  dob: string
  phone: string
  gender: string
  profile?: IProfile   // ✅ có thể có hoặc không
}

// Response từ API
export interface IFriendListResponse {
  message: string
  request: {
    friends: IFriend[]
  }
}

// API gọi danh sách bạn bè
export const AllFriendApi = async (): Promise<IFriendListResponse> => {
  try {
    // Lấy token từ cookie (đặt sau khi login)
    const token = getCookie('accessToken')

    if (!token) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
    }

    const response = await api.get<IFriendListResponse>(
      `/api/friends/find-list-friend`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching friends:', error)
    throw error
  }
}
