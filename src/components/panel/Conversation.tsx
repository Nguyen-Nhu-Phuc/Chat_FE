'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText, useUserFromCookie } from '@/components/common/useUserFromCookie'
import { listConversations } from '@/repository/list-conversations/list-conversations'

// giả sử bạn có userId của người đăng nhập (ví dụ lấy từ cookie / context)

const Conversation = ({
    onSelectConversation,
}: {
    onSelectConversation: (convId: string, senderId: string, receiverId: string) => void
}) => {

    const CURRENT_USER_ID = useUserFromCookie();
    const [conversations, setConversations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [lastMessage, setLastMessage] = useState('')

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true)
                const res: any = await listConversations()
                if (Array.isArray(res.request)) {
                    setConversations(res.request)
                } else {
                    setError('Dữ liệu không hợp lệ')
                }
            } catch (err) {
                setError('Không thể tải danh sách cuộc trò chuyện')
            } finally {
                setLoading(false)
            }
        }
        fetchConversations()
    }, [])

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap={2}>
                {loading && <CircularProgress />}
                {!loading && conversations.length === 0 && <Typography>Danh sách trống</Typography>}

                {conversations.map((conv: any) => {
                    const otherUser = conv.participants.find((p: any) => p._id !== CURRENT_USER_ID.id)
                    if (!otherUser) return null

                    const initialText = getInitialText(`${otherUser.firstName} ${otherUser.lastName}`)

                    return (
                        <Box
                            key={conv._id}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            bgcolor="white"
                            p={2}
                            borderRadius={1}
                            boxShadow={1}
                            sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}
                            onClick={() => {
                                onSelectConversation(conv._id, CURRENT_USER_ID.id, otherUser._id);
                            }}

                        >
                            <SkeletonAvatar
                                size={40}
                                variant="circular"
                                InitialText={initialText}
                                styler={{ backgroundColor: '#9c27b0', cursor: 'pointer' }}
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
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Conversation
