'use client'

import { Box, Typography } from "@mui/material"

export const ListConversations = () => {
    return (
        <Box
            height="100vh"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Typography
                component="div"
                color="text.disabled"
                variant="h5"
                sx={{ textAlign: "center" }}
            >
                Trò chuyện với nó đi mậy
            </Typography>
        </Box>
    )
}
