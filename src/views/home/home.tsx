'use client'

import React from 'react'
import {
    Box,
    IconButton,
    TextField,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Divider,
    Paper,
    Button
} from '@mui/material'
import { IconMessageCircle } from '@tabler/icons-react'
import SkeletonAvatar from '@/components/common/Skeleton'
import { useUserFromCookie, getInitialText } from '@/components/common/useUserFromCookie'

const Home: React.FC = () => {
    const user = useUserFromCookie()

    // Lấy chữ cái đầu để hiển thị
    const initialText = user
        ? getInitialText(`${user.firstName || ''} ${user.lastName || ''}`)
        : 'U'

    return (
        <Box display="flex" height="100vh" bgcolor="white" fontFamily="sans-serif" color="text.primary">
            {/* Sidebar Left */}
            <Box
                display="flex"
                gap={3}
                flexDirection="column"
                width={64}
                bgcolor="primary.main"
                color="white"
                alignItems="center"
                py={2}
            >
                <SkeletonAvatar
                    size={40}
                    variant="circular"
                    InitialText={initialText}
                    color="white"
                    fontSize={16}
                    fontWeight={600}
                    styler={{ backgroundColor: '#ff2f2f', cursor: 'pointer' }}
                    onClickText={() => console.log('Avatar clicked', user)}
                />

                <IconButton color="inherit" size="large">
                    <IconMessageCircle stroke={2} size={28} />
                </IconButton>
            </Box>

            {/* Main content */}
            <Box display="flex" flex={1} height="100%">
                {/* Left panel */}
                <Paper
                    elevation={0}
                    sx={{
                        width: 320,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRight: 1,
                        borderColor: 'divider'
                    }}
                >
                    {/* Search bar */}
                    <Box
                        display="flex"
                        alignItems="center"
                        px={2}
                        py={1.5}
                        borderBottom={1}
                        borderColor="divider"
                    >
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Tìm kiếm"
                            InputProps={{
                                startAdornment: (
                                    <Box mr={1} display="flex" alignItems="center" color="text.secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 21l-4.35-4.35m0 0a7 7 0 11-9.9-9.9 7 7 0 019.9 9.9z"
                                            />
                                        </svg>
                                    </Box>
                                )
                            }}
                        />
                    </Box>

                    {/* Tabs */}
                    <Box
                        display="flex"
                        px={2}
                        py={1}
                        borderBottom={1}
                        borderColor="divider"
                        justifyContent="space-between"
                    >
                        <Button
                            variant="text"
                            size="small"
                            sx={{ borderBottom: 2, borderColor: 'primary.main', color: 'primary.main' }}
                        >
                            Ưu tiên
                        </Button>
                        <Button variant="text" size="small" sx={{ color: 'text.secondary' }}>
                            Khác
                        </Button>
                    </Box>

                    {/* Chat list */}
                    <List sx={{ flex: 1, overflowY: 'auto' }}>
                        <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: 'action.selected' }}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.light' }}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 15a4 4 0 014-4h1a5 5 0 0110 0h.1a3.5 3.5 0 01-.6 6.9h-10.5A3.5 3.5 0 013 15z"
                                        />
                                    </svg>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body1" fontWeight={600} noWrap>
                                            Cloud của tôi
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            17 giờ
                                        </Typography>
                                    </Box>
                                }
                                secondary={
                                    <Box display="flex" alignItems="center" gap={0.5}>
                                        <Typography variant="caption" color="text.secondary">
                                            Bạn:
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Xin chào bạn!
                                        </Typography>
                                    </Box>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </List>
                </Paper>

                {/* Chat content */}
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
                        <Avatar sx={{ bgcolor: 'primary.light', width: 44, height: 44 }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 15a4 4 0 014-4h1a5 5 0 0110 0h.1a3.5 3.5 0 01-.6 6.9h-10.5A3.5 3.5 0 013 15z"
                                />
                            </svg>
                        </Avatar>
                        <Box>
                            <Typography fontWeight={600}>Cloud của tôi</Typography>
                            <Typography variant="caption" color="text.secondary">
                                Lưu và đồng bộ dữ liệu giữa các thiết bị
                            </Typography>
                        </Box>
                    </Box>

                    {/* Messages */}
                    <Box flex={1} overflow="auto" p={3}>
                        {/* danh sách tin nhắn ở đây */}
                    </Box>

                    {/* Chat input */}
                    <Box
                        component="form"
                        display="flex"
                        alignItems="center"
                        borderTop={1}
                        borderColor="divider"
                        bgcolor="white"
                        p={2}
                        gap={2}
                    >
                        <TextField
                            multiline
                            maxRows={4}
                            placeholder="Nhập @, tin nhắn tới Cloud của tôi"
                            fullWidth
                            size="small"
                        />
                        <IconButton color="primary" type="submit" sx={{ border: 1, borderColor: 'divider' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home
