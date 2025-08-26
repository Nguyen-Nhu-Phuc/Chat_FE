import React, { useState, useEffect } from 'react';
import {
    Box, Typography, List, ListItemAvatar, Avatar, Paper, ListItemText, ListItemButton, Chip
} from '@mui/material';

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import DetailListFriens from '../Chat/DetailListFriens';
import { FriendRequestList } from '../Chat/ListAwaitAccept';

import socket from '@/utils/socket';
import { useUserFromCookie } from '../common/useUserFromCookie';

const PanelListFriend = () => {
    const [active, setActive] = useState<'friends' | 'requests'>('friends');
    const [requests, setRequests] = useState<any[]>([]);
    const user = useUserFromCookie();

    useEffect(() => {
        if (!user?.id) return;

        socket.emit("join_user", user.id);

        socket.on("init_accept_friends", (data: any) => {
            setRequests(data?.acceptFriends || []);
        });

        socket.on("update_accept_friends", (data: any) => {
            setRequests(data?.acceptFriends || []);
        });

        return () => {
            socket.off("init_accept_friends");
            socket.off("update_accept_friends");
        };
    }, [user?.id]);

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
                        <Chip size='small' label={requests.length} color='error' />
                    </ListItemButton>
                </List>
            </Paper>

            {active === 'friends' && <DetailListFriens />}
            {active === 'requests' && <FriendRequestList requests={requests} />}
        </>
    );
};

export default PanelListFriend;
