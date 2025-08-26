import React, { useState, useCallback } from 'react';

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
  fontWeight?: any
}

export const SkeletonAvatar: React.FC<SkeletonAvatarInitialTextProps> = ({
  src,
  alt,
  className,
  size,
  styler,
  color,
  InitialText,
  fontWeight,
  fontSize,
  isLoading,
  onClickText,
  onClickAvatar,
  variant,
  variantSK = 'circular',
  variantTypography
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(true);
    setImageError(true);
  }, []);

  // Hiển thị skeleton trong khi ảnh đang tải
  if (isLoading) {
    return (
      <Skeleton
        variant={variantSK as 'circular' | 'text' | 'rectangular' | 'rounded'}
        width={size}
        height={size}
        animation="wave"
      />
    );
  }

  // Nếu ảnh có src và không bị lỗi
  return (
    <>
      {src && !imageError ? (
        <>
          {!imageLoaded && (
            <Skeleton
              variant={variantSK}
              width={size}
              height={size}
              animation="wave"
            />
          )}
          <CustomAvatar
            variant={variant}
            onClick={onClickAvatar}
            className={className}
            skin="light-static"
            size={typeof size === "string" ? parseInt(size, 10) : size}
            style={!imageLoaded ? { display: 'none' } : styler}
            onLoad={handleImageLoad}
            onError={handleImageError}
            src={src} // Sử dụng src trực tiếp từ prop
            alt={alt}
          />
        </>
      ) : (
        <CustomAvatar
          variant={variant}
          className={className}
          size={typeof size === "string" ? parseInt(size, 10) : size}
          style={styler}
          onClick={onClickText}
          skin="light-static"
        >
          <Typography variant={variantTypography} fontWeight={fontWeight} fontSize={fontSize} color={color}>
            {InitialText}
          </Typography>
        </CustomAvatar>
      )}
    </>
  );
};

export default React.memo(SkeletonAvatar);
