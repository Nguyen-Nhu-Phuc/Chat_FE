'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { AllFriendApi, DeleteFriendApi, IFriend } from '@/repository/addFriend/addFriend'
import SkeletonAvatar from '@/components/common/Skeleton'
import { getInitialText } from '@/components/common/useUserFromCookie'
import { toast } from 'react-toastify'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import ToastProvider from '@/components/common/ToastProvider'

const DetailListFriends = () => {
    const [friends, setFriends] = useState<IFriend[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deletingFriendId, setDeletingFriendId] = useState<string | null>(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null)
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

    // Menu handlers
    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, friendId: string) => {
        setAnchorEl(event.currentTarget)
        setSelectedFriendId(friendId)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
        setSelectedFriendId(null)
    }

    // Xử lý khi click Xóa
    const handleDeleteClick = (friendId: string) => {
        setSelectedFriendId(friendId)
        setConfirmOpen(true)
    }

    // Xác nhận xóa
    const handleConfirmDelete = async () => {
        if (!selectedFriendId) return
        try {
            setDeletingFriendId(selectedFriendId)
            await DeleteFriendApi(selectedFriendId)
            toast.success('Xóa bạn thành công!')
            setFriends((prev) => prev.filter((f) => f._id !== selectedFriendId))
        } catch (err) {
            console.error('Error deleting friend:', err)
            toast.error('Xóa bạn thất bại. Vui lòng thử lại.')
        } finally {
            setDeletingFriendId(null)
            setConfirmOpen(false)
            handleCloseMenu()
            setSelectedFriendId(null)
        }
    }

    return (
        <Box display="flex" flexDirection="column" flex={1} bgcolor="grey.100">
            {/* Header */}
            <Box display="flex" alignItems="center" gap={2} borderBottom={1} borderColor="divider" px={3} py={2} bgcolor="white">
                <SkeletonAvatar size={40} variant="circular" InitialText="F" color="white" fontSize={16} fontWeight={600} styler={{ backgroundColor: '#1976d2' }} />
                <Box>
                    <Typography fontWeight={300}>Danh sách bạn bè</Typography>
                </Box>
            </Box>

            {/* Tổng số bạn bè */}
            <Box p={2}>
                <Typography component={'div'} variant="body1" color="text.secondary">
                    Tổng số bạn bè: {friends.length}
                </Typography>
            </Box>

            {/* Danh sách friends */}
            <Box p={2} display="flex" flexDirection="column" gap={2}>
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
                            borderRadius={2}
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
                            <IconButton onClick={(e) => handleMenuClick(e, friend._id)} size="small" disabled={isDeleting}>
                                <MoreVertIcon />
                            </IconButton>
                        </Box>
                    )
                })}
            </Box>

            {/* Menu */}
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <MenuItem onClick={() => console.log('Xem thông tin', selectedFriendId)}>Xem thông tin</MenuItem>
                <MenuItem onClick={() => console.log('Chặn người này', selectedFriendId)}>Chặn người này</MenuItem>
                <MenuItem onClick={() => handleDeleteClick(selectedFriendId!)} sx={{ color: 'red' }}>
                    Xóa bạn
                </MenuItem>
            </Menu>

            {/* ConfirmDialog */}
            <ConfirmDialog
                open={confirmOpen}
                title="Xóa bạn bè"
                message="Bạn có chắc muốn xóa bạn này không?"
                loading={deletingFriendId === selectedFriendId}
                onConfirm={handleConfirmDelete}
                onCancel={() => setConfirmOpen(false)}
            />
            <ToastProvider />
        </Box>

    )
}

export default DetailListFriends
