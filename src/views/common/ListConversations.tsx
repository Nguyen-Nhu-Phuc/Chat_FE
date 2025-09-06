'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Paper } from '@mui/material'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText, useUserFromCookie } from '@/components/common/useUserFromCookie'
import { listConversations } from '@/repository/list-conversations/list-conversations'
import { GetMessagesApi, IMessage } from '@/repository/addFriend/addFriend'

export const ListConversations = () => {
  const CURRENT_USER_ID = useUserFromCookie()

  const [conversations, setConversations] = useState<any[]>([])
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessages, setSelectedMessages] = useState<IMessage[]>([])
  const [selectedConvId, setSelectedConvId] = useState<string>('')
  const [loadingMessages, setLoadingMessages] = useState(false)

  // Lấy danh sách cuộc trò chuyện
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoadingConversations(true)
        const res: any = await listConversations()
        console.log('👉 API listConversations:', res)

        if (res && Array.isArray(res.request)) {
          setConversations(res.request)
        } else {
          setError('Dữ liệu không hợp lệ')
        }
      } catch (err) {
        console.error('❌ Lỗi khi lấy danh sách cuộc trò chuyện:', err)
        setError('Không thể tải danh sách cuộc trò chuyện')
      } finally {
        setLoadingConversations(false)
      }
    }

    fetchConversations()
  }, [])

  // Khi click vào 1 conversation
  const handleConversationClick = async (conversationId: string) => {
    if (!conversationId) return
    try {
      setSelectedConvId(conversationId)
      setLoadingMessages(true)
      console.log('👉 Conversation được chọn:', conversationId)

      const res = await GetMessagesApi(conversationId)
      console.log('👉 API GetMessages:', res)

      if (res && res.success && Array.isArray(res.messages)) {
        setSelectedMessages(res.messages)

        // Log gọn gàng toàn bộ messages
        console.table(
          res.messages.map((m) => ({
            id: m._id,
            content: m.content,
            sender: `${m.sender?.firstName || ''} ${m.sender?.lastName || ''}`,
            createdAt: new Date(m.createdAt).toLocaleString(),
          }))
        )
      } else {
        setSelectedMessages([])
      }
    } catch (err) {
      console.error('❌ Lỗi khi lấy tin nhắn:', err)
      setSelectedMessages([])
    } finally {
      setLoadingMessages(false)
    }
  }

  return (
    <Box bgcolor={"red"} className="conchoThinh" display="flex" height="100vh" width="100%">
      {/* Cột bên trái: danh sách cuộc trò chuyện */}
      {/* <Box
        width="30%"
        borderRight="1px solid #ddd"
        overflow="auto"
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        {loadingConversations && (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CircularProgress />
          </Box>
        )}

        {!loadingConversations && conversations.length === 0 && (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            Danh sách trống
          </Typography>
        )}

        {conversations.map((conv: any) => {
          const otherUser = conv.participants.find(
            (p: any) => p._id !== CURRENT_USER_ID?.id
          )
          if (!otherUser) return null

          const initialText = getInitialText(
            `${otherUser.firstName} ${otherUser.lastName}`
          )

          return (
            <Paper
              key={conv._id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 2,
                cursor: 'pointer',
                bgcolor: conv._id === selectedConvId ? '#f5f5f5' : 'white',
              }}
              onClick={() => handleConversationClick(conv._id)}
            >
              <SkeletonAvatar
                size={40}
                variant="circular"
                InitialText={initialText}
                color="white"
                fontSize={16}
                fontWeight={600}
                styler={{ backgroundColor: '#9c27b0' }}
                src={otherUser?.profile?.avatar || undefined}
                alt={`${otherUser.firstName} ${otherUser.lastName}`}
              />
              <Box flex={1}>
                <Typography fontWeight={500}>
                  {otherUser.firstName} {otherUser.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Bạn bè
                </Typography>
              </Box>
            </Paper>
          )
        })}
      </Box> */}

      {/* Cột bên phải: hiển thị tin nhắn */}
      <Box flex={1} p={2} display="flex" flexDirection="column" gap={1} overflow="auto">
        {!selectedConvId && (
          <Typography variant="h5" color="text.secondary" textAlign="center" mt={4}>
            Trò chuyện với nó đi mậy
          </Typography>
        )}

        {loadingMessages && (
          <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {!loadingMessages && selectedConvId && selectedMessages.length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            Chưa có tin nhắn nào
          </Typography>
        )}

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
