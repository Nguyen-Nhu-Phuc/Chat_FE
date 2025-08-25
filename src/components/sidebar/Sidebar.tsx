import React from 'react'
import { Box, IconButton } from '@mui/material'
import { IconMessageCircle, IconAddressBook } from '@tabler/icons-react'
import SkeletonAvatar from '@/components/common/Skeleton'
import { useUserFromCookie, getInitialText } from '@/components/common/useUserFromCookie'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const router = useRouter();
    const user = useUserFromCookie()

    const linkToFriend = () => {

        router.push(`/friend`);
    }

    const linkToHome = () => {

        router.push(`/home`);

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
                <SkeletonAvatar
                    size={40}
                    variant="circular"
                    InitialText={initialText}
                    color="white"
                    fontSize={16}
                    fontWeight={600}
                    styler={{ backgroundColor: '#ff2f2f', cursor: 'pointer' }}
                    onClickText={() => console.log('Avatar clicked', user)}
                    src={user?.profile?.avatar || undefined} // nếu có avatar thì dùng ảnh
                    alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                />

                <IconButton color="inherit" size="large">
                    <IconMessageCircle onClick={() => { linkToHome() }} stroke={2} size={35} />
                </IconButton>

                <IconButton color="inherit" size="large">
                    <IconAddressBook onClick={() => { linkToFriend() }} stroke={2} size={35} />
                </IconButton>
            </Box>
        </>
    )
}

export default Sidebar
