'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Avatar,
  Divider,
  Box,
  IconButton,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material'
import { IconCamera, IconEdit, IconX, IconCheck } from '@tabler/icons-react'
import { UpdateProfileApi } from '@/repository/auth/auth'
import { toast } from 'react-toastify'

interface IUserInfoDialogProps {
  open: boolean
  onClose: () => void
  user: {
    id?: string
    firstName?: string
    lastName?: string
    phone?: string
    gender?: string
    dob?: string
    profile?: {
      avatar?: string
      address?: string
      bio?: string
      status?: string
    }
  } | null
  initialText: string
  onUpdateAvatar?: () => void
  onProfileUpdated?: () => void // callback để reload lại thông tin ngoài Sidebar
}

const UserInfoDialog: React.FC<IUserInfoDialogProps> = ({
  open,
  onClose,
  user,
  initialText,
  onUpdateAvatar,
  onProfileUpdated,
}) => {
  // console.log(user);
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim()

  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bio: user?.profile?.bio || '',
    address: user?.profile?.address || '',
    status: user?.profile?.status || '',
  })

  
  

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    if (!user?.id) return
    setLoading(true)
    try {
      await UpdateProfileApi({
        user: user.id,
        bio: formData.bio,
        address: formData.address,
        status: formData.status,
      })

      toast.success('Cập nhật thông tin thành công')
      setEditMode(false)

      if (onProfileUpdated) onProfileUpdated()
    } catch (error) {
      console.error('Cập nhật profile thất bại:', error)
      toast.error('Cập nhật thông tin thất bại vui lòng thử lại')
    } finally {
      setLoading(false)
    }
  }


  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: 'center' }}>Thông tin cá nhân</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        {/* Avatar + nút cập nhật */}
        <Box position="relative" display="inline-block">
          <Avatar
            src={user?.profile?.avatar || undefined}
            alt={fullName}
            sx={{ width: 80, height: 80, margin: '0 auto' }}
          >
            {initialText}
          </Avatar>
          <IconButton
            size="small"
            sx={{ position: 'absolute', bottom: 0, right: 0, bgcolor: 'white' }}
            onClick={onUpdateAvatar}
          >
            <IconCamera size={18} />
          </IconButton>
        </Box>

        {/* Họ tên */}
        <Typography variant="h6" mt={2}>
          {fullName || 'Chưa có tên'}
        </Typography>

        {/* SĐT */}
        <Typography variant="body2" color="text.secondary">
          📞 {user?.phone || 'Chưa có số điện thoại'}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Giới tính */}
        <Box textAlign="left" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Giới tính
          </Typography>
          <Typography>{user?.gender || 'Chưa cập nhật'}</Typography>
        </Box>

        {/* Ngày sinh */}
        <Box textAlign="left" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Ngày sinh
          </Typography>
          <Typography>
            {user?.dob ? new Date(user.dob).toLocaleDateString('vi-VN') : 'Chưa cập nhật'}
          </Typography>
        </Box>

        {/* Địa chỉ */}
        <Box textAlign="left" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Địa chỉ
          </Typography>
          {editMode ? (
            <TextField
              size="small"
              fullWidth
              value={formData.address}
              onChange={e => handleChange('address', e.target.value)}
            />
          ) : (
            <Typography>{user?.profile?.address || 'Chưa cập nhật'}</Typography>
          )}
        </Box>

        {/* Tiểu sử */}
        <Box textAlign="left" mb={1}>
          <Typography variant="subtitle2" color="text.secondary">
            Tiểu sử
          </Typography>
          {editMode ? (
            <TextField
              size="small"
              fullWidth
              multiline
              minRows={2}
              value={formData.bio}
              onChange={e => handleChange('bio', e.target.value)}
            />
          ) : (
            <Typography>{user?.profile?.bio || 'Chưa có'}</Typography>
          )}
        </Box>

        {/* Trạng thái */}
        <Box textAlign="left">
          <Typography variant="subtitle2" color="text.secondary">
            Trạng thái
          </Typography>
          {editMode ? (
            <TextField
              size="small"
              fullWidth
              value={formData.status}
              onChange={e => handleChange('status', e.target.value)}
            />
          ) : (
            <Typography>{user?.profile?.status || 'Không xác định'}</Typography>
          )}
        </Box>

        {/* Nút hành động */}
        <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
          {editMode ? (
            <>
              <Button
                variant="contained"
                color="success"
                startIcon={loading ? <CircularProgress size={16} /> : <IconCheck />}
                onClick={handleSave}
                disabled={loading}
              >
                Lưu
              </Button>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<IconX />}
                onClick={() => setEditMode(false)}
              >
                Hủy
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              startIcon={<IconEdit />}
              onClick={() => setEditMode(true)}
            >
              Chỉnh sửa
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default UserInfoDialog
