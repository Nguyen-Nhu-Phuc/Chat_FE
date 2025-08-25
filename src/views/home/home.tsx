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

import Chat from '@/components/Chat/Chat'

const Home: React.FC = () => {

    return (

        <>
            <Panel />
            <Chat />
        </>



    )
}

export default Home
