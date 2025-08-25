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
    CircularProgress
} from '@mui/material'
import { IconX, IconSearch } from '@tabler/icons-react'

import { findFriendApi } from '@/repository/findFriend/find'
import CustomTextField from '@/components/mui/TextField'
import { SkeletonAvatar } from '@/components/common/Skeleton'
import { getInitialText } from '@/components/common/useUserFromCookie'

interface ModalAddFriendProps {
    open: boolean
    handleClose: () => void
}

export const ModalAddFriend = ({ open, handleClose }: ModalAddFriendProps) => {
    const [data, setData] = useState<any>(null)
    const [phone, setPhone] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const findFriend = async (): Promise<void> => {
        if (!phone) return
        try {
            setLoading(true)
            const res: any = await findFriendApi(phone)
            setData(res?.request || null)
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

    const initialText = data
        ? getInitialText(`${data.firstName || ''} ${data.lastName || ''}`)
        : 'U'


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
                        <Button
                            size="small"
                            variant="contained"
                            sx={{ borderRadius: '9999px', textTransform: 'none' }}
                        >
                            Kết bạn
                        </Button>
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
