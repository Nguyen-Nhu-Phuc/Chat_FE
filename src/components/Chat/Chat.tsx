'use client'

import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { useUserFromCookie } from '@/components/common/useUserFromCookie'
import { IMessage } from '@/repository/addFriend/addFriend'

interface ChatProps {
  selectedConvId: string
  selectedMessages: IMessage[]
  loadingMessages: boolean
}

export const Chat = ({
  selectedConvId,
  selectedMessages,
  loadingMessages,
}: ChatProps) => {
  const CURRENT_USER_ID = useUserFromCookie()

  return (
    <Box className="chat" display="flex" height="100vh" width="100%">
      {/* Cột phải: hiển thị tin nhắn */}
      <Box flex={1} p={2} display="flex" flexDirection="column" gap={1} overflow="auto">
        {/* Nếu chưa chọn cuộc trò chuyện */}
        {!selectedConvId && (
          <Typography variant="h5" color="text.secondary" textAlign="center" mt={4}>
            Trò chuyện với nó đi mậy
          </Typography>
        )}

        {/* Loading khi lấy messages */}
        {loadingMessages && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Nếu đã chọn nhưng chưa có tin nhắn */}
        {!loadingMessages && selectedConvId && selectedMessages.length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            Chưa có tin nhắn nào
          </Typography>
        )}

        {/* Render danh sách tin nhắn */}
        {selectedMessages.map((msg) => {
          const isMine = msg.sender?._id === CURRENT_USER_ID?.id

          return (
            <Box
              key={msg._id}
              alignSelf={isMine ? 'flex-end' : 'flex-start'}
              bgcolor={isMine ? '#1976d2' : '#e0e0e0'}
              color={isMine ? 'white' : 'black'}
              px={2}
              py={1}
              borderRadius={2}
              maxWidth="60%"
            >
              {/* Nội dung tin nhắn */}
              <Typography variant="body2">{msg.content}</Typography>

              {/* Tên người gửi + thời gian */}
              <Typography variant="caption" display="block" textAlign="right">
                {msg.sender?.firstName} {msg.sender?.lastName} •{' '}
                {new Date(msg.createdAt).toLocaleTimeString()}
              </Typography>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
