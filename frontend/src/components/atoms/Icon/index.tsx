import { styled } from '@mui/material';

interface IconPointerProps {
  disabled?: boolean;
}

interface IconProps extends IconPointerProps {
  width?: string;
  height?: string;
  src: string;
  alt: string;
  handleClick?: () => void;
}
const StyledImage = styled('img')(({ disabled }: IconPointerProps) => ({
  cursor: disabled ? 'default' : 'pointer',
}));

const Icon = ({
  width,
  height,
  src,
  alt,
  handleClick,
  disabled,
}: IconProps) => {
  return (
    <StyledImage
      onClick={handleClick}
      disabled={disabled}
      width={width}
      height={height}
      src={src}
      alt={alt}
    />
  );
};

export default Icon;
