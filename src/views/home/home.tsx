'use client'

import React, { useState } from 'react'
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Avatar,
} from '@mui/material'
import Sidebar from '@/components/sidebar/Sidebar'
import Panel from '@/components/panel/panel'

import { Chat } from '@/components/Chat/Chat'
import { GetMessagesApi, IMessage } from '@/repository/addFriend/addFriend'

const Home: React.FC = () => {

    const [selectedConvId, setSelectedConvId] = useState<string>('')
    const [messages, setMessages] = useState<IMessage[]>([])
    const [loadingMessages, setLoadingMessages] = useState(false)

    const [senderId, setSenderId] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('');

    // callback nhận từ Panel
    const handleSelectConversation = async (convId: string, sender: string, receiver: string) => {
        // console.log('Sender:', senderId);
        // console.log('Receiver:', receiverId);
        if (!convId) return
        setSenderId(sender);
        setReceiverId(receiver);
        try {
            setSelectedConvId(convId)
            setLoadingMessages(true)

            // console.log('🔎 Đã chọn cuộc trò chuyện:', convId)

            const res = await GetMessagesApi(convId)
            if (res && res.success && Array.isArray(res.messages)) {
                setMessages(res.messages)
            } else {
                setMessages([])
            }
        } catch (error) {
            console.error('❌ Lỗi khi lấy tin nhắn:', error)
            setMessages([])
        } finally {
            setLoadingMessages(false)
        }
    }

    return (

        <>
            <Panel onSelectConversation={handleSelectConversation} />
            <Box flex={1}>
                <Chat
                    selectedConvId={selectedConvId}
                    selectedMessages={messages}
                    loadingMessages={loadingMessages}
                    senderId={senderId}
                    receiverId={receiverId}
                />
            </Box>
        </>



    )
}

export default Home
