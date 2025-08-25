'use client'

import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '@/components/sidebar/Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box
            display="flex"
            height="100vh"
            bgcolor="white"
            fontFamily="sans-serif"
            color="text.primary"
        >
            <Sidebar />

            <Box display="flex" flex={1} height="100%">
                {children}
            </Box>
        </Box>
    )
}

export default Layout
