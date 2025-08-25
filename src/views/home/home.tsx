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
import PanelListFriend from '@/components/panel/PanelListFriend'
import DetailListFriens from '@/components/Chat/DetailListFriens'

const Home: React.FC = () => {

    return (
        <Box display="flex" height="100vh" bgcolor="white" fontFamily="sans-serif" color="text.primary">
            {/* Sidebar Left */}
            <Sidebar />

            {/* Main content */}
            <Box display="flex" flex={1} height="100%">
                {/* <Panel /> */}
                <PanelListFriend/>
                
                {/* Chat content */}
                {/* <Chat/> */}
                <DetailListFriens/>
            </Box>
        </Box>
    )
}

export default Home
