'use client'

import React from 'react'
import { Box, IconButton, TextField, Select, MenuItem, Typography } from '@mui/material'
import { IconMessageCircle, IconAddressBook } from '@tabler/icons-react';
import SkeletonAvatar from '@/components/common/Skeleton'
import { useUserFromCookie, getInitialText } from '@/components/common/useUserFromCookie'

const Home: React.FC = () => {

    const user = useUserFromCookie()

    // Lấy chữ cái đầu để hiển thị
    const initialText = user
        ? getInitialText(`${user.firstName || ''} ${user.lastName || ''}`)
        : 'U'

    return (
        <div className="h-screen flex bg-white font-sans text-slate-700 overflow-hidden">
            {/* Sidebar Left */}
            <aside className="flex flex-col w-16 bg-blue-700 text-white select-none">
                <nav className="flex flex-col items-center space-y-6 py-3">
                    <SkeletonAvatar 
                        size={40}
                        variant="circular"
                        InitialText={initialText}
                        color="white"
                        fontSize={16}
                        fontWeight={600}
                        styler={{ backgroundColor: "#1e40af", cursor: "pointer" }}
                        onClickText={() => console.log("Avatar clicked", user)}
                    />

                    <IconButton color="inherit" size="large">
                        <IconMessageCircle stroke={2} size={28} />
                    </IconButton>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex flex-1 h-full overflow-hidden">

                {/* Left panel with search and chat list */}
                <section className="w-80 flex flex-col border-r border-slate-300 overflow-hidden">

                    {/* Search bar */}
                    <div className="flex items-center space-x-2 px-4 py-3 border-b border-slate-300">
                        <div className="relative flex-1">
                            <TextField
                                size="small"
                                // placeholder="Tìm kiếm"
                                className="w-full rounded-lg bg-slate-100 py-2 pl-10 pr-4 text-sm text-slate-700 placeholder-slate-400"
                                InputProps={{
                                    startAdornment: (
                                        <Box className="absolute left-3 top-2.5 w-5 h-5 text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0a7 7 0 11-9.9-9.9 7 7 0 019.9 9.9z" />
                                            </svg>
                                        </Box>
                                    ),
                                }}
                            />
                        </div>
                        {/* Add user / group buttons */}
                    </div>

                    {/* Tabs */}
                    <nav className="flex items-center justify-between px-4 py-2 border-b border-slate-300 select-none text-sm font-semibold">
                        <ul className="flex space-x-4 text-slate-800 border-b border-slate-800 border-opacity-10">
                            <li>
                                <button className="pb-2 border-b-2 border-blue-500 text-blue-700">Ưu tiên</button>
                            </li>
                            <li>
                                <button className="pb-2 hover:text-slate-600">Khác</button>
                            </li>
                        </ul>
                    </nav>

                    {/* Chat list */}
                    <ul className="chat-list flex-1 overflow-y-auto bg-white divide-y divide-slate-200 text-sm">
                        <li className="relative bg-blue-50 text-slate-900">
                            <a href="#" className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-100">
                                <div className="w-10 h-10 rounded-lg bg-blue-400 flex items-center justify-center shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h1a5 5 0 0110 0h.1a3.5 3.5 0 01-.6 6.9h-10.5A3.5 3.5 0 013 15z" />
                                    </svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center mb-1">
                                        <Typography className="font-semibold truncate">Cloud của tôi</Typography>
                                        <time className="text-xs text-slate-400">17 giờ</time>
                                    </div>
                                    <div className="flex items-center space-x-1 text-xs text-slate-400 truncate">
                                        <span>Bạn:</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                                        </svg>
                                        <span>Hình ảnh</span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>

                {/* Chat content */}
                <section className="flex flex-col flex-1 bg-slate-100 overflow-hidden">
                    {/* Chat header */}
                    <header className="flex items-center space-x-4 border-b border-slate-300 px-5 py-3 bg-white select-none">
                        <div className="flex items-center space-x-3 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-11 h-11 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 014-4h1a5 5 0 0110 0h.1a3.5 3.5 0 01-.6 6.9h-10.5A3.5 3.5 0 013 15z" />
                            </svg>
                        </div>
                        <div className="flex flex-col shrink">
                            <Typography className="font-semibold text-slate-900 flex items-center space-x-2">
                                <span>Cloud của tôi</span>
                            </Typography>
                            <Typography className="text-xs text-slate-500 truncate max-w-xs">Lưu và đồng bộ dữ liệu giữa các thiết bị</Typography>
                        </div>
                    </header>

                    {/* Messages */}
                    <div className="chat-conversation flex-1 overflow-y-auto p-6 space-y-5">

                    </div>

                    {/* Chat input */}
                    <form className="flex items-center border-t border-slate-300 bg-white p-3 space-x-3 select-none">
                        <textarea
                            className="flex-1 resize-none border border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            rows={1}
                            placeholder="Nhập @, tin nhắn tới Cloud của tôi"
                        />
                        <button type="submit" className="flex items-center justify-center w-11 h-11 border border-slate-300 rounded-lg hover:bg-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </form>
                </section>

            </main>
        </div>
    )
}

export default Home
