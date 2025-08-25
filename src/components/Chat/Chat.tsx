import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'

const Chat = () => {
    return (
        <Box display="flex" flexDirection="column" flex={1} bgcolor="grey.100">
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
    )
}

export default Chat