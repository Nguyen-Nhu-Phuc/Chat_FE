/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
    Dialog, DialogContent, DialogTitle, IconButton,

    useMediaQuery,

} from '@mui/material'
import { IconX, IconUpload, IconDownload, IconTrash } from '@tabler/icons-react'


import { toast } from 'react-toastify';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

import { getCookie } from 'cookies-next';
import { findFriendApi } from '@/repository/findFriend/find';
import CustomTextField from '@/components/mui/TextField';



interface ModalExportEmployeeProps {
    open: boolean
    handleClose: () => void
}

export const ModalExportEmployee = ({
    open,
    handleClose,
}: ModalExportEmployeeProps) => {

    const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

    const [data, setData] = useState<any>(null)

    const [phone, setPhone] = useState<any>(null)

    const findFriend = async () => {

        try {
            const res = await findFriendApi(phone)

            console.log('res', res)

            setData(res)

        }
        catch (error) {
            toast.error('Lỗi kết nối server')
        }

    }


    useEffect(() => {


        findFriend();


    }, [phone])




    return (
        <>

            <Dialog
                fullScreen={isMobile}
                maxWidth='sm'
                open={open}
            >
                <DialogTitle className='pb-0'>
                    Thêm bạn mới
                </DialogTitle>
                <IconButton
                    aria-label='close'
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[600],
                    }}
                >
                    <IconX />
                </IconButton>

                <DialogContent>

                    <CustomTextField
                        fullWidth
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại người dùng"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={findFriend}>
                                    <IconDownload />
                                </IconButton>
                            ),
                        }}

                    >


                    </CustomTextField>




                </DialogContent>
            </Dialog>
        </>
    )
}
