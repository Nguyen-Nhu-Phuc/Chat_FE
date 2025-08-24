'use client'

import React from 'react'
import {
    Box,
    IconButton,
    TextField,
    Typography,
    Avatar,
} from '@mui/material'
import Sidebar from '@/components/sidebar/Sidebar'
import Panel from '@/components/panel/panel'

const Home: React.FC = () => {

    return (
        <Box display="flex" height="100vh" bgcolor="white" fontFamily="sans-serif" color="text.primary">
            {/* Sidebar Left */}
            <Sidebar />

            {/* Main content */}
            <Box display="flex" flex={1} height="100%">
                {/* Left panel */}

                <Panel />
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
