'use client'

import React, { useState } from 'react'
import { Box } from '@mui/material'
import Panel from '@/components/panel/panel'
import { Chat } from '@/components/Chat/Chat'
import useSWR from 'swr'
import { GetMessagesApi, IMessage } from '@/repository/addFriend/addFriend'

const fetchMessages = async (convId: string): Promise<IMessage[]> => {
  try {
    if (!convId) return []
    const res = await GetMessagesApi(convId)
    if (res && res.success && Array.isArray(res.messages)) {
      return res.messages
    }
    return []
  } catch (error) {
    console.error('❌ Lỗi khi fetch tin nhắn:', error)
    return []
  }
}

const Home: React.FC = () => {
  const [selectedConvId, setSelectedConvId] = useState<string>('')
  const [senderId, setSenderId] = useState<string>('')
  const [receiverId, setReceiverId] = useState<string>('')

  // SWR tự động fetch lại tin nhắn khi selectedConvId thay đổi
  const { data: messages = [], isLoading } = useSWR(
    selectedConvId ? ['messages', selectedConvId] : null,
    () => fetchMessages(selectedConvId),
    {
      refreshInterval: 1000, 
      revalidateOnFocus: true, 
    }
  )

  // callback nhận từ Panel
  const handleSelectConversation = async (
    convId: string,
    sender: string,
    receiver: string
  ) => {
    if (!convId) return
    setSelectedConvId(convId)
    setSenderId(sender)
    setReceiverId(receiver)
  }

  return (
    <>
      <Panel onSelectConversation={handleSelectConversation} />
      <Box flex={1}>
        <Chat
          selectedConvId={selectedConvId}
          selectedMessages={messages}
          loadingMessages={isLoading}
          senderId={senderId}
          receiverId={receiverId}
        />
      </Box>
    </>
  )
}

export default Home
