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
import Conversation from '@/components/panel/Conversation';

const Panel = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ModalAddFriend open={open} handleClose={handleClose}></ModalAddFriend>
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

                {/* Chat list */}
                {/* <List sx={{ flex: 1, overflowY: 'auto' }}>
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

                </List> */}

                <Conversation />
            </Paper></>
    )
}

export default Panel