import React, { useState } from 'react';
import {
    Box, Typography, List, ListItemAvatar, Avatar, Paper, ListItemText, ListItemButton
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';


import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DetailListFriens from '../Chat/DetailListFriens';
import { ListAwaitAccept } from '../Chat/ListAwaitAccept';

const PanelListFriend = () => {
    const [active, setActive] = useState<'friends' | 'requests'>('friends');

    return (

        <>
            <Paper
                elevation={0}
                sx={{
                    pt: 0,
                    width: 320,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRight: 1,
                    borderColor: 'divider'
                }}
            >
                <List sx={{ flex: 1, overflowY: 'auto', mt: '-8px' }}>
                    <ListItemButton
                        selected={active === 'friends'}
                        onClick={() => setActive('friends')}
                        sx={{ mb: '10px' }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light' }} >
                                <PeopleAltIcon />
                            </Avatar>
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
                    </ListItemButton>

                    <ListItemButton
                        selected={active === 'requests'}
                        onClick={() => setActive('requests')}
                        sx={{ mb: '10px' }}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.light' }}>
                                <PersonAddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body1" fontWeight={600} noWrap>
                                        Danh sách lời mời kết bạn
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItemButton>
                </List>
            </Paper>

            {active === 'friends' && <DetailListFriens />}

            {active === 'requests' && <ListAwaitAccept />}
        </>

    );
};

export default PanelListFriend;
