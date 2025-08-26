/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import {
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Box,
    Typography,
    CircularProgress,
    Chip
} from '@mui/material'
import { IconX, IconSearch } from '@tabler/icons-react'

import { findFriendApi, checkFriendApi } from '@/repository/findFriend/find'
import CustomTextField from '@/components/mui/TextField'
import { SkeletonAvatar } from '@/components/common/Skeleton'
import { getInitialText, useUserFromCookie } from '@/components/common/useUserFromCookie'

import socket from '@/utils/socket'

interface ModalAddFriendProps {
    open: boolean
    handleClose: () => void
}

export const ModalAddFriend = ({ open, handleClose }: ModalAddFriendProps) => {
    const [data, setData] = useState<any>(null)
    const [phone, setPhone] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [sending, setSending] = useState(false)
    const [checking, setChecking] = useState(null)

    const currentUserId = useUserFromCookie()?.id

    const findFriend = async (): Promise<void> => {
        if (!phone) return
        try {
            setLoading(true)
            let res: any = await findFriendApi(phone)
            setData(res?.request || null)

            try {
                const resCheck: any = await checkFriendApi(res?.request?.id)
                if (resCheck?.status) setChecking(resCheck?.status)
                else setChecking(null)
            } catch (error) {
                setChecking(null)
            }
        } catch (error) {
            setData(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!phone) return
        const delayDebounce = setTimeout(() => {
            findFriend()
        }, 800)
        return () => clearTimeout(delayDebounce)
    }, [phone])

    useEffect(() => {
        if (!currentUserId) return
        socket.emit('join', currentUserId)



        return () => {
            socket.off('update_accept_friends')
            socket.off('error_message')
        }
    }, [currentUserId])

    const initialText = data
        ? getInitialText(`${data.firstName || ''} ${data.lastName || ''}`)
        : 'U'

    // 📩 gửi lời mời
    const handleSendRequest = async () => {

        try {
            if (!currentUserId || !data?.id) return
            setSending(true)

            socket.emit('send_friend_request', {
                fromUserId: currentUserId,
                toUserId: data.id
            })

            setTimeout(() => {
                setSending(false)
            }, 1000)
        }
        catch (error) {
            console.error('Error sending friend request:', error)
            setSending(false)
        }


    }

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
            <DialogTitle className="pb-0 text-lg font-semibold">
                Thêm bạn mới
            </DialogTitle>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[600]
                }}
            >
                <IconX />
            </IconButton>

            <DialogContent>

                <CustomTextField
                    fullWidth
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={findFriend}>
                                <IconSearch />
                            </IconButton>
                        )
                    }}
                />

                {loading && (
                    <Box display="flex" justifyContent="center" py={2}>
                        <CircularProgress size={28} />
                    </Box>
                )}

                {!loading && data && (
                    <Box
                        mt={3}
                        p={2}
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        height={80}
                        sx={{
                            borderRadius: 2,
                            border: '1px solid #eee',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                            bgcolor: 'background.paper'
                        }}
                    >
                        <Box display="flex" alignItems="center" gap={2}>
                            <SkeletonAvatar
                                size={40}
                                variant="circular"
                                InitialText={initialText}
                                color="white"
                                fontSize={16}
                                fontWeight={600}
                                styler={{ backgroundColor: '#ff2f2f', cursor: 'pointer' }}
                                src={data?.profile?.avatar || undefined}
                                alt={`${data?.firstName || ''} ${data?.lastName || ''}`}
                            />
                            <Box>
                                <Typography fontWeight={600}>
                                    {data?.firstName} {data?.lastName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {data?.phone}
                                </Typography>
                            </Box>
                        </Box>
                        {checking == 2 && <Typography color="text.secondary" variant="body2">

                            <Chip color='success' label={'Đây là bạn'}></Chip>
                        </Typography>}
                        {checking == 1 && <Typography color="text.secondary" variant="body2">
                            <Chip label='Bạn bè'></Chip>

                        </Typography>}
                        {checking == 0 && <Button
                            size="small"
                            variant="contained"
                            sx={{ borderRadius: '9999px', textTransform: 'none' }}
                            disabled={sending}
                            onClick={handleSendRequest}
                        >
                            {sending ? 'Đang gửi...' : 'Kết bạn'}
                        </Button>}
                    </Box>
                )}

                {!loading && phone && !data && (
                    <Box mt={3} textAlign="center">
                        <Typography color="text.secondary" variant="body2">
                            Không tìm thấy người dùng
                        </Typography>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}
