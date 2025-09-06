import React, { useState, useCallback, useEffect } from 'react';
import { Skeleton, Typography } from '@mui/material';
import type { TypographyProps } from '@mui/material/Typography';

import CustomAvatar from '@/components/mui/Avatar';

interface SkeletonAvatarInitialTextProps {
  src?: string;
  alt?: string;
  className?: string;
  size?: number | string;
  styler?: React.CSSProperties;
  color?: string;
  InitialText?: string;
  fontSize?: number | string;
  isLoading?: boolean;
  onClickText?: () => void;
  onClickAvatar?: () => void;
  variant?: 'circular' | 'rounded' | 'square';
  variantSK?: 'circular' | 'text' | 'rectangular' | 'rounded';
  variantTypography?: TypographyProps['variant'];
  fontWeight?: any;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarInitialTextProps> = ({
  src,
  alt,
  className,
  size = 40,
  styler,
  color = 'inherit',
  InitialText = '',
  fontWeight = 600,
  fontSize = 16,
  isLoading = false,
  onClickText,
  onClickAvatar,
  variant = 'circular',
  variantSK = 'circular',
  variantTypography = 'body1'
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Đảm bảo chỉ render InitialText sau khi client đã mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(true);
    setImageError(true);
  }, []);

  // Convert size về number
  const avatarSize = typeof size === 'string' ? parseInt(size, 10) : size;

  // Nếu đang loading
  if (isLoading) {
    return (
      <Skeleton
        variant={variantSK}
        width={avatarSize}
        height={avatarSize}
        animation="wave"
      />
    );
  }

  // Nếu có ảnh và không lỗi
  if (src && !imageError) {
    return (
      <>
        {!imageLoaded && (
          <Skeleton
            variant={variantSK}
            width={avatarSize}
            height={avatarSize}
            animation="wave"
          />
        )}
        <CustomAvatar
          variant={variant}
          onClick={onClickAvatar}
          className={className}
          skin="light-static"
          size={avatarSize}
          style={!imageLoaded ? { display: 'none' } : styler}
          onLoad={handleImageLoad}
          onError={handleImageError}
          src={src}
          alt={alt}
        />
      </>
    );
  }

  // Avatar với InitialText
  return (
    <CustomAvatar
      variant={variant}
      className={className}
      size={avatarSize}
      style={styler}
      onClick={onClickText}
      skin="light-static"
    >
      {mounted && (
        <Typography
          variant={variantTypography}
          fontWeight={fontWeight}
          fontSize={fontSize}
          color={color}
        >
          {InitialText}
        </Typography>
      )}
    </CustomAvatar>
  );
};

export default React.memo(SkeletonAvatar);
