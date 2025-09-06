'use client'

import React from 'react'
import { Box, Typography, CircularProgress, Paper } from '@mui/material'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText } from '@/components/common/useUserFromCookie'

interface ConversationListProps {
  conversations: any[]
  loading: boolean
  currentUserId: string
  selectedConvId: string
  onSelectConversation: (id: string) => void
}

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  loading,
  currentUserId,
  selectedConvId,
  onSelectConversation
}) => {
  return (
    <Box
      width="30%"
      borderRight="1px solid #ddd"
      overflow="auto"
      p={2}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <CircularProgress />
        </Box>
      )}

      {!loading && conversations.length === 0 && (
        <Typography variant="h6" color="text.secondary" textAlign="center">
          Danh sách trống
        </Typography>
      )}

      {conversations.map((conv: any) => {
        const otherUser = conv.participants.find((p: any) => p._id !== currentUserId)
        if (!otherUser) return null

        const initialText = getInitialText(`${otherUser.firstName} ${otherUser.lastName}`)

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
            onClick={() => onSelectConversation(conv._id)}
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
    </Box>
  )
}
