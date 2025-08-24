'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Typography, Button, InputAdornment, IconButton, Grid } from '@mui/material'
import Image from 'next/image'
import CustomTextField from '@/components/mui/TextField'
import { LoginApi } from '@/repository/auth/auth'
import ToastProvider from '@/components/common/ToastProvider'
import { toast } from 'react-toastify'
import { setCookie } from 'cookies-next'
import { encodeJsonData } from '@/libs/crypto'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// Schema validation
const schema = yup.object().shape({
    phone: yup
        .string()
        .required('Số điện thoại là bắt buộc')
        .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
    password: yup.string().required('Mật khẩu là bắt buộc').min(3, 'Mật khẩu phải có ít nhất 3 ký tự'),
})

type FormValues = yup.InferType<typeof schema>

// Kiểu dữ liệu trả về từ API
type LoginResponse = {
    message: string
    data: {
        accessToken: string
        refreshToken: string
        user: {
            id: string
            firstName: string
            lastName: string
            phone: string
            gender: string
            dob: string
        }
    }
}

const Login = () => {
    const router = useRouter()
    const [isPasswordShown, setIsPasswordShown] = useState(false)
    const handleClickShowPassword = () => setIsPasswordShown((show) => !show)

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            phone: '',
            password: '',
        },
    })

    const onSubmit = async (data: FormValues) => {
        try {
            const response = (await LoginApi(data)) as { status: number; data: LoginResponse }

            if (response.status === 201) {
                toast.success('Đăng nhập thành công!')
                reset()

                const { accessToken, refreshToken, user } = response.data.data

                // Lưu token thường
                setCookie('accessToken', accessToken, { maxAge: 60 * 60 * 24 })
                setCookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 7 })

                // Lưu user đã mã hóa
                const encodedUser = encodeJsonData(user)
                if (encodedUser) {
                    setCookie('user', encodedUser, { maxAge: 60 * 60 * 24 })
                }

                router.push('/home')
            } else {
                toast.error('Đăng nhập thất bại!')
            }
        } catch (error: unknown) {
            const errorMsg =
                (error as { response?: { data?: { error?: string } } })?.response?.data?.error ||
                'Có lỗi xảy ra khi đăng nhập'
            toast.error(errorMsg)
            console.error('Login error:', error)
        }
    }

    return (
        <Box className="min-h-screen flex flex-col items-center pt-10 px-4 bg-[#e2efff]">
            {/* Logo */}
            <Box className="text-center mb-6">
                <Image src="/zlogo.png" alt="Logo" width={114} height={41} className="mx-auto mb-2" />
                <Typography variant="body1" className="text-gray-900 max-w-[280px] mx-auto leading-relaxed">
                    Đăng nhập tài khoản Zalo <br />
                    để kết nối với ứng dụng Zalo Web
                </Typography>
            </Box>

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                className="w-[560px] h-[540px] mb-[50px] bg-white rounded-lg shadow-md p-6"
            >
                <Typography variant="h6" className="font-bold text-center mb-6 select-none pb-5">
                    Đăng nhập tài khoản
                </Typography>

                <Grid container spacing={2}>
                    {/* Phone */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại người dùng"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            )}
                        />
                    </Grid>

                    {/* Password */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <CustomTextField
                                    {...field}
                                    fullWidth
                                    label="Mật khẩu"
                                    placeholder="············"
                                    type={isPasswordShown ? 'text' : 'password'}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    edge="end"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                >
                                                    <i className={isPasswordShown ? 'tabler-eye-off' : 'tabler-eye'} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Typography
                            className="text-right text-sm text-blue-600 cursor-pointer select-none hover:underline"
                            onClick={() => router.push('/register')}
                        >
                            Chưa có tài khoản? Đăng ký
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12 }} >
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            disabled={isSubmitting}
                            className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-md normal-case"
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Đăng nhập'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Toast Container */}
            <ToastProvider />
        </Box>
    )
}

export default Login
