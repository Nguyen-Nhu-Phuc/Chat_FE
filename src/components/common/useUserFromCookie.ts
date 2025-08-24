'use client'

import { getCookie } from 'cookies-next'
import { decodeJsonEndcoding } from '@/libs/crypto'

export const useUserFromCookie = () => {
  try {
    const encodedUser = getCookie('user')

    if (!encodedUser || typeof encodedUser !== 'string') return null

    const decodedUser = decodeJsonEndcoding(encodedUser)
    return decodedUser
  } catch (error) {
    console.error('useUserFromCookie error:', error)
    return null
  }
}

// utils/stringHelper.ts
export const getInitialText = (fullName?: string): string => {
  try {
    if (!fullName || fullName.trim() === "") return "";

    const parts = fullName.trim().split(" ");
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    // lấy 2 chữ cái đầu của 2 từ cuối cùng
    const lastTwo = parts.slice(-2);
    return lastTwo.map(word => word.charAt(0).toUpperCase()).join("");
  } catch (error) {
    console.error("Error in getInitialText:", error);
    return "";
  }
};

