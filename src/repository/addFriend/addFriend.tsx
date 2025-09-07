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

export interface IDeleteFriendResponse {
  message: string
  deletedFriendId?: string
}

export const DeleteFriendApi = async (myFriend: string): Promise<IDeleteFriendResponse> => {
  try {
    // Lấy token từ cookie
    const token = getCookie('accessToken')
    if (!token) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
    }

    const response = await api.post<IDeleteFriendResponse>(
      '/api/friends/delete-friend',
      { myFriend }, // body JSON
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error deleting friend:', error)
    throw error
  }
}

// Interface cho 1 tin nhắn
export interface IMessage {
  _id: string
  senderId: string
  conversationId: string
  text: string
  createdAt: string
  updatedAt?: string
  content: string
  sender?: {
    _id: string
    firstName: string
    lastName: string
    profile?: IProfile
  }
}

// Interface response từ API
export interface IMessageListResponse {
  success: boolean
  messages: IMessage[]
}

// API: Lấy danh sách tin nhắn theo conversationId
export const GetMessagesApi = async (
  conversationId: string
): Promise<IMessageListResponse> => {
  try {
    const token = getCookie('accessToken')

    if (!token) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
    }

    if (!conversationId) {
      throw new Error('conversationId không được rỗng')
    }

    const response = await api.get<IMessageListResponse>(
      `/api/chat/${conversationId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}

// Interface response từ API gửi tin nhắn
export interface ISendMessageResponse {
  success: boolean
  message: string
  data?: IMessage
}

// API: Gửi tin nhắn
export const SendMessageApi = async (
  receiverId: string,
  type: string,
  content: string
): Promise<ISendMessageResponse> => {
  try {
    const token = getCookie('accessToken')

    if (!token) {
      throw new Error('Token không tồn tại, vui lòng đăng nhập lại')
    }

    if (!receiverId || !type || !content) {
      throw new Error('receiverId, type và content không được rỗng')
    }

    const response = await api.post<ISendMessageResponse>(
      `/api/chat/send`,
      {
        receiverId,
        type,
        content,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error sending message:', error)
    throw error
  }
}
