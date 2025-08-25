import React from 'react'
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
    Button,
} from '@mui/material'

import { IconUsers } from '@tabler/icons-react'

const PanelListFriend = () => {
    return (
        <>
            <Paper
                elevation={0}
                sx={{
                    // paddingTop: 0,
                    width: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: 1,
                    borderColor: 'divider'
                }}
            >

                {/* Chat list */}
                <List sx={{ flex: 1, overflowY: 'auto' }}>
                    <ListItem component="div" sx={{ cursor: 'pointer', bgcolor: 'action.selected' }}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light' }} />

                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body1" fontWeight={600} noWrap>
                                        Danh sách bạn bè
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>

                    <Divider />

                </List>
            </Paper></>
    )
}

export default PanelListFriend