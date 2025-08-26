'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import { AllFriendApi, IFriend } from '@/repository/addFriend/addFriend'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText } from '@/components/common/useUserFromCookie'
import { toast } from 'react-toastify'

const Conversation = () => {
    const [friends, setFriends] = useState<IFriend[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingFriendId, setDeletingFriendId] = useState<string | null>(null)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    // Fetch friends
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                setLoading(true)
                const res = await AllFriendApi()
                if (res?.request?.friends) setFriends(res.request.friends)
            } catch (err) {
                console.error(err)
                setError('Không thể tải danh sách bạn bè')
            } finally {
                setLoading(false)
            }
        }
        fetchFriends()
    }, [])

    return (
        <Box>
            <Box display="flex" flexDirection="column" gap={2}>
                {(friends.length === 0) && <Box p={2}>
                    <Typography variant='h5' className='flex m-auto justify-center items-center' color="textSecondary">{'Danh sách trống'}</Typography>
                </Box>}
                {loading && <Box className='flex m-auto justify-center items-center' >
                    <CircularProgress />
                </Box>}
                {friends.map((friend) => {
                    const initialText = getInitialText(`${friend.firstName} ${friend.lastName}`)
                    const isDeleting = deletingFriendId === friend._id
                    return (
                        <Box
                            key={friend._id}
                            display="flex"
                            alignItems="center"
                            gap={2}
                            bgcolor="white"
                            p={2}
                            borderRadius={1}
                            boxShadow={1}
                            sx={{ opacity: isDeleting ? 0.5 : 1 }}
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
                            <Box flex={1}>
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
        </Box>

    )
}

export default Conversation
