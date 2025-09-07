import React, { useState } from 'react'
import {
    Box,
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

import { IconUserPlus } from '@tabler/icons-react';
import { ModalAddFriend } from '@/views/common/AddFriend';
import Conversation from '@/components/panel/Conversation'


export interface PanelProps {
    onSelectConversation: (convId: string, senderId: string, receiverId: string) => void;
}

const Panel = ({ onSelectConversation }: PanelProps) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ModalAddFriend open={open} handleClose={() => setOpen(false)} />
            <Paper className='panel'
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
                    <Typography onClick={() => { handleOpen() }} title='Thêm bạn bè' component={'div'} padding={2} color='textSecondary' className='cursor-pointer'>
                        <IconUserPlus stroke={2} />
                    </Typography>

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
                <Conversation onSelectConversation={onSelectConversation} />
            </Paper>
        </>
    )
}

export default Panel