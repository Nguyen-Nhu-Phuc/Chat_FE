'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { AllFriendApi, IFriend } from '@/repository/addFriend/addFriend'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText } from '@/components/common/useUserFromCookie'

const DetailListFriens = () => {
  const [friends, setFriends] = useState<IFriend[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true)
        const res = await AllFriendApi()

        // Log dữ liệu lấy được từ API
        console.log('API response:', res)
        console.log('Friends list:', res?.request?.friends || [])

        if (res?.request?.friends) {
          setFriends(res.request.friends)
        }
      } catch (err) {
        setError('Không thể tải danh sách bạn bè')
        console.error('Error fetchFriends:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFriends()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" flex={1} bgcolor="grey.100">
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        borderBottom={1}
        borderColor="divider"
        px={3}
        py={2}
        bgcolor="white"
      >
        <SkeletonAvatar
          size={40}
          variant="circular"
          InitialText="F"
          color="white"
          fontSize={16}
          fontWeight={600}
          styler={{ backgroundColor: '#1976d2' }}
        />
        <Box>
          <Typography fontWeight={300}>Danh sách bạn bè</Typography>
        </Box>
      </Box>

      {/* Số lượng bạn bè */}
      <Box p={2}>
        <Typography variant="caption" color="text.secondary">
          Tổng số bạn bè: {friends.length}
        </Typography>
      </Box>

      {/* List friends */}
      <Box p={2} display="flex" flexDirection="column" gap={2}>
        {friends.map((friend) => {
          const initialText = getInitialText(`${friend.firstName} ${friend.lastName}`)

          return (
            <Box
              key={friend._id}
              display="flex"
              alignItems="center"
              gap={2}
              bgcolor="white"
              p={2}
              borderRadius={2}
              boxShadow={1}
            >
              <SkeletonAvatar
                size={40}
                variant="circular"
                InitialText={initialText}
                color="white"
                fontSize={16}
                fontWeight={600}
                styler={{ backgroundColor: '#9c27b0', cursor: 'pointer' }}
               src={friend?.profile?.avatar || undefined}

                alt={`${friend.firstName} ${friend.lastName}`}
                onClickText={() => console.log('Friend clicked:', friend)}
              />
              <Box>
                <Typography fontWeight={500}>
                  {friend.firstName} {friend.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {friend.phone}
                </Typography>
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* Debug JSON */}
      <Box p={2} bgcolor="white" borderRadius={2} mt={2}>
        <Typography variant="subtitle2">Debug dữ liệu JSON:</Typography>
        <pre style={{ fontSize: 12, whiteSpace: 'pre-wrap' }}>
          {JSON.stringify(friends, null, 2)}
        </pre>
      </Box>
    </Box>
  )
}

export default DetailListFriens
