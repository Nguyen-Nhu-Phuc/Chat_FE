// 'use client'

// import React, { useEffect, useState } from 'react'
// import { Box, Typography, CircularProgress, Paper } from '@mui/material'
// import SkeletonAvatar from '@/components/common/Skeleton'
// import { getInitialText, useUserFromCookie } from '@/components/common/useUserFromCookie'
// import { listConversations } from '@/repository/list-conversations/list-conversations'
// import { GetMessagesApi, IMessage } from '@/repository/addFriend/addFriend'

// export const ListConversations = () => {
//   const CURRENT_USER_ID = useUserFromCookie()

//   const [conversations, setConversations] = useState<any[]>([])
//   const [loadingConversations, setLoadingConversations] = useState(true)
//   const [error, setError] = useState('')
//   const [selectedMessages, setSelectedMessages] = useState<IMessage[]>([])
//   const [selectedConvId, setSelectedConvId] = useState<string>('')
//   const [loadingMessages, setLoadingMessages] = useState(false)

//   // Lấy danh sách cuộc trò chuyện
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         setLoadingConversations(true)
//         const res: any = await listConversations()

//         if (res && Array.isArray(res.request)) {
//           setConversations(res.request)
//         } else {
//           setError('Dữ liệu không hợp lệ')
//         }
//       } catch (err) {
//         console.error('❌ Lỗi khi lấy danh sách cuộc trò chuyện:', err)
//         setError('Không thể tải danh sách cuộc trò chuyện')
//       } finally {
//         setLoadingConversations(false)
//       }
//     }

//     fetchConversations()
//   }, [])

//   return (
//     <Box bgcolor={"red"} display="flex" height="100vh" width="100%">

//       {/* Cột bên phải: hiển thị tin nhắn */}
//       <Box flex={1} p={2} display="flex" flexDirection="column" gap={1} overflow="auto">
//         {!selectedConvId && (
//           <Typography variant="h5" color="text.secondary" textAlign="center" mt={4}>
//             Trò chuyện với nó đi mậy
//           </Typography>
//         )}

//         {loadingMessages && (
//           <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
//             <CircularProgress />
//           </Box>
//         )}

//         {!loadingMessages && selectedConvId && selectedMessages.length === 0 && (
//           <Typography variant="body1" color="text.secondary" textAlign="center" mt={4}>
//             Chưa có tin nhắn nào
//           </Typography>
//         )}

//         {selectedMessages.map((msg) => {
//           const isMine = msg.sender?._id === CURRENT_USER_ID?.id

//           return (
//             <Box
//               key={msg._id}
//               alignSelf={isMine ? 'flex-end' : 'flex-start'}
//               bgcolor={isMine ? '#1976d2' : '#e0e0e0'}
//               color={isMine ? 'white' : 'black'}
//               px={2}
//               py={1}
//               borderRadius={2}
//               maxWidth="60%"
//             >
//               {/* Nội dung tin nhắn */}
//               <Typography variant="body2">{msg.content}</Typography>

//               {/* Tên người gửi + thời gian */}
//               <Typography variant="caption" display="block" textAlign="right">
//                 {msg.sender?.firstName} {msg.sender?.lastName} •{' '}
//                 {new Date(msg.createdAt).toLocaleTimeString()}
//               </Typography>
//             </Box>
//           )
//         })}
//       </Box>
//     </Box>
//   )
// }
