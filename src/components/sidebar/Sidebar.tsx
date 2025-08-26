'use client'

import React, { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { IconMessageCircle, IconAddressBook } from '@tabler/icons-react'
import SkeletonAvatar from '@/components/common/Skeleton'
import { useUserFromCookie, getInitialText } from '@/components/common/useUserFromCookie'
import { useRouter } from 'next/navigation'
import UserInfoDialog from '@/components/sidebar/UserInfoDialog'

const Sidebar = () => {
  const router = useRouter()
  const user = useUserFromCookie()
  const [openDialog, setOpenDialog] = useState(false)

  const linkToFriend = () => {
    try {
      router.push(`/friend`)
    } catch (error) {
      console.error('Lỗi khi điều hướng Friend:', error)
    }
  }

  const linkToHome = () => {
    try {
      router.push(`/home`)
    } catch (error) {
      console.error('Lỗi khi điều hướng Home:', error)
    }
  }

  const initialText = user
    ? getInitialText(`${user.firstName || ''} ${user.lastName || ''}`)
    : 'U'

  return (
    <>
      <Box
        display="flex"
        gap={3}
        flexDirection="column"
        width={64}
        bgcolor="primary.main"
        color="white"
        alignItems="center"
        py={2}
      >
        {/* Avatar bấm được */}
        <Box onClick={() => setOpenDialog(true)} sx={{ cursor: 'pointer' }}>
          <SkeletonAvatar
            size={40}
            variant="circular"
            InitialText={initialText}
            color="white"
            fontSize={16}
            fontWeight={600}
            styler={{ backgroundColor: '#ff2f2f' }}
            src={user?.profile?.avatar || undefined}
            alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
          />
        </Box>

        {/* Nút Chat */}
        <IconButton color="inherit" size="large" onClick={linkToHome}>
          <IconMessageCircle stroke={2} size={35} />
        </IconButton>

        {/* Nút Friend */}
        <IconButton color="inherit" size="large" onClick={linkToFriend}>
          <IconAddressBook stroke={2} size={35} />
        </IconButton>
      </Box>

      {/* Dialog hiển thị thông tin User */}
      <UserInfoDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        user={user}
        initialText={initialText}
      />
    </>
  )
}

export default Sidebar
