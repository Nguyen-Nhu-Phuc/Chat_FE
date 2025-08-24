'use client'

import React, { useState } from 'react'
import { Box, Typography, Button, InputAdornment, IconButton, Grid, RadioGroup, FormControlLabel, Radio, FormHelperText, FormLabel } from '@mui/material'
import Image from 'next/image'
import CustomTextField from '@/components/mui/TextField'
import { RegisterApi } from '@/repository/auth/auth'
import ToastProvider from '@/components/common/ToastProvider'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  firstName: yup.string().required('Họ là bắt buộc'),
  lastName: yup.string().required('Tên là bắt buộc'),
  dob: yup.string().required('Ngày sinh là bắt buộc'),
  phone: yup
    .string()
    .required('Số điện thoại là bắt buộc')
    .matches(/^[0-9]{10,11}$/, 'Số điện thoại không hợp lệ'),
  gender: yup.string().required('Giới tính là bắt buộc'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

type FormValues = yup.InferType<typeof schema>

const Register = () => {
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
      firstName: '',
      lastName: '',
      dob: '',
      phone: '',
      gender: '',
      password: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await RegisterApi(data)

      if (response.status === 201) {
        toast.success('Đăng ký thành công!')
        reset()
        const redirectURL = '/login'
        router.push(redirectURL)
      } else {
        toast.error('Đăng ký thất bại!')
      }
    } catch (error: unknown) {
      const errorMsg =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ||
        'Có lỗi xảy ra khi đăng ký'
      toast.error(errorMsg)
      console.error('Register error:', error)
    }
  }

  return (
    <Box className="min-h-screen flex flex-col items-center pt-10 px-4 bg-[#e2efff]">
      {/* Logo */}
      <Box className="text-center mb-6">
        <Image src="/zlogo.png" alt="Logo" width={114} height={41} className="mx-auto mb-2" />
        <Typography variant="body1" className="text-gray-900 max-w-[280px] mx-auto leading-relaxed">
          Đăng ký tài khoản Zalo <br />
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
          Đăng ký tài khoản
        </Typography>

        <Grid container spacing={2}>
          {/* First Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Họ"
                  placeholder="Nhập họ người dùng"
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
              )}
            />
          </Grid>

          {/* Last Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Tên"
                  placeholder="Nhập tên người dùng"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              )}
            />
          </Grid>

          {/* Date of Birth */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Ngày sinh"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
              )}
            />
          </Grid>

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

          {/* Gender */}
          <Grid size={{ xs: 12 }}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel component="legend">Giới tính</FormLabel>
                  <RadioGroup row {...field}>
                    <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                    <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                  </RadioGroup>
                  {errors.gender && (
                    <FormHelperText error>{errors.gender?.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </Grid>
          {/* <Grid size={{ xs: 12 }}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  {...field}
                  fullWidth
                  label="Giới tính"
                  placeholder="Nam/Nữ"
                  error={!!errors.gender}
                  helperText={errors.gender?.message}
                />
              )}
            />
          </Grid> */}

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

          {/* Button */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className="bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 rounded-md normal-case"
            >
              {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Toast Container */}
      <ToastProvider />
    </Box>
  )
}

export default Register
