'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, CircularProgress, TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useUserFromCookie } from '@/components/common/useUserFromCookie'
import { IMessage, SendMessageApi } from '@/repository/addFriend/addFriend'
import { socket } from '@/socket/socket'

interface ChatProps {
  selectedConvId: string
  selectedMessages: IMessage[]
  loadingMessages: boolean
  senderId: string
  receiverId: string
  onMessageSent?: () => void
}

interface Message {
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  type: string
}

export const Chat = ({
  selectedConvId,
  selectedMessages,
  loadingMessages,
  senderId,
  receiverId,
  onMessageSent,
}: ChatProps) => {
  const CURRENT_USER_ID = useUserFromCookie()
  const [messageInput, setMessageInput] = useState('')
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null) // 📌 ref cuối danh sách

  // Hàm tự động scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Hàm xử lý gửi tin nhắn
  const handleSend = async () => {
    try {
      if (!messageInput.trim()) return
      if (!receiverId) {
        console.error('❌ Không tìm thấy ID người nhận')
        return
      }

      setSending(true)

      await SendMessageApi(receiverId, 'text', messageInput.trim())

      socket.emit('send_message', {
        conversationId: selectedConvId,
        senderId: CURRENT_USER_ID?.id,
        receiverId,
        content: messageInput.trim(),
        type: 'text',
      })

      setMessageInput('')
      if (onMessageSent) onMessageSent()
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error)
    } finally {
      setSending(false)
    }
  }

  // Lắng nghe socket tin nhắn
  useEffect(() => {
    socket.on('receive_message', (msg: Message) => {
      if (msg.conversationId === selectedConvId) {
        if (onMessageSent) onMessageSent()
      }
    })
    return () => {
      socket.off('receive_message')
    }
  }, [selectedConvId, onMessageSent])

  // Scroll mỗi khi tin nhắn thay đổi
  useEffect(() => {
    scrollToBottom()
  }, [selectedMessages])

  const sortedMessages = [...selectedMessages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  return (
    <Box className="chat" display="flex" height="100vh" width="100%" flexDirection="column">
      {/* Danh sách tin nhắn */}
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

        {!loadingMessages && selectedConvId && sortedMessages.length === 0 && (
          <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
            Chưa có tin nhắn nào
          </Typography>
        )}

        {sortedMessages.map((msg) => {
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
              <Typography variant="body2">{msg.content}</Typography>
              <Typography variant="caption" display="block" textAlign="right">
                {msg.sender?.firstName} {msg.sender?.lastName} •{' '}
                {new Date(msg.createdAt).toLocaleTimeString()}
              </Typography>
            </Box>
          )
        })}
        <div ref={messagesEndRef} /> {/* 📌 Điểm đánh dấu cuối */}
      </Box>

      {/* Ô nhập tin nhắn */}
      {selectedConvId && (
        <Box
          display="flex"
          alignItems="center"
          p={2}
          borderTop="1px solid #ddd"
          bgcolor="background.paper"
        >
          <TextField
            fullWidth
            placeholder="Nhập tin nhắn..."
            variant="outlined"
            size="small"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend()
            }}
            disabled={sending}
          />
          <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }} disabled={sending}>
            {sending ? <CircularProgress size={24} /> : <SendIcon />}
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
