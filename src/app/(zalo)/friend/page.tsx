// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Friend from '@/views/friend/index'


export const metadata: Metadata = {
    title: 'Friend',
    description: 'Friend Page',
}

const FriendPage = () => {
    return (

        <Friend />

    )
}

export default FriendPage
