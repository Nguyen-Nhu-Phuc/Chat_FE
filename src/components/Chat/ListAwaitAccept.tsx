"use client";

import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import { useUserFromCookie } from "../common/useUserFromCookie";

// MUI
import {
    Box,
    Avatar,
    Typography,
    Button,
    Stack,
} from "@mui/material";

export const FriendRequestList = () => {
    const [requests, setRequests] = useState<any>([]);
    const user = useUserFromCookie();

    console.log("👤 User:", user);

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

    // ✅ Accept friend
    const handleAccept = (fromUserId: string) => {
        if (!user?.id) return;

        socket.emit("respond_friend_request", {
            myId: user.id,
            fromUserId,
            status: "accepted",
        });
    };

    // ❌ Reject friend
    const handleReject = (fromUserId: string) => {
        if (!user?.id) return;

        socket.emit("respond_friend_request", {
            myId: user.id,
            fromUserId,
            status: "rejected",
        });
    };

    return (
        <Box className="p-4">
            <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                sx={{ display: "flex", alignItems: "center" }}
            >
                📥 Lời mời kết bạn
            </Typography>

            {requests.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Không có lời mời nào
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {requests.map((req: any, index: number) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                marginTop: "20px",
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar
                                    src={
                                        req.from.profile.avatar ||
                                        `https://ui-avatars.com/api/?name=${req.from.firstName}+${req.from.lastName}`
                                    }
                                    alt={req.from.firstName}
                                />
                                <Typography fontWeight={600}>
                                    {req.from.firstName} {req.from.lastName}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleAccept(req.from._id)}
                                >
                                    Chấp nhận
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => handleReject(req.from._id)}
                                >
                                    Từ chối
                                </Button>
                            </Stack>
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
};
