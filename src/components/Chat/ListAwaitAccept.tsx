"use client";

import { Box, Avatar, Typography, Button, Stack } from "@mui/material";
import socket from "@/utils/socket";
import { useUserFromCookie } from "../common/useUserFromCookie";
import { useState, useEffect } from "react";

export const FriendRequestList = ({ requests }: { requests: any[] }) => {
    const user = useUserFromCookie();
    const [localRequests, setLocalRequests] = useState<any[]>([]);

    // Đồng bộ props vào state 1 lần hoặc khi thay đổi thực sự
    useEffect(() => {
        if (requests && requests.length > 0) {
            setLocalRequests(requests);
        }
    }, [requests]);

    const handleAccept = (fromUserId: string) => {
        if (!user?.id) return;

        socket.emit("respond_friend_request", {
            myId: user.id,
            fromUserId,
            status: "accepted",
        });

        // Xoá khỏi UI
        setLocalRequests((prev) =>
            prev.filter((r) => r.from?._id !== fromUserId)
        );
    };

    const handleReject = (fromUserId: string) => {
        if (!user?.id) return;

        socket.emit("respond_friend_request", {
            myId: user.id,
            fromUserId,
            status: "rejected",
        });

        setLocalRequests((prev) =>
            prev.filter((r) => r.from?._id !== fromUserId)
        );
    };

    console.log("Rendering FriendRequestList with requests:", localRequests);

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

            {localRequests.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                    Không có lời mời nào
                </Typography>
            ) : (
                <Stack spacing={2}>
                    {localRequests.map((req: any) => (
                        <Box
                            key={req.from?._id} // ✅ Dùng id thay vì index
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
                                        req?.from?.profile?.avatar ||
                                        `https://ui-avatars.com/api/?name=${req?.from?.firstName}+${req?.from?.lastName}`
                                    }
                                    alt={req?.from?.firstName}
                                />
                                <Typography fontWeight={600}>
                                    {req?.from?.firstName} {req?.from?.lastName}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleAccept(req?.from?._id)}
                                >
                                    Chấp nhận
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    color="error"
                                    onClick={() => handleReject(req?.from?._id)}
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
