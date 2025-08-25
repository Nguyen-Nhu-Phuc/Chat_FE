'use client'

import React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
} from '@mui/material'

interface ConfirmDialogProps {
    open: boolean
    title?: string
    message?: string
    loading?: boolean
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    title = 'Xác nhận',
    message = 'Bạn có chắc muốn thực hiện hành động này?',
    loading = false,
    onConfirm,
    onCancel,
}) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} disabled={loading}>
                    Hủy
                </Button>
                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : null}
                >
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
