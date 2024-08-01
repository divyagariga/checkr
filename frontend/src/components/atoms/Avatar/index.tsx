import styled from '@emotion/styled';
import { Avatar as MuiAvatar } from '@mui/material';
import { AVATAR_ALT_TEXT } from '../../../utils/constants';

interface AvatarProps {
  src: string;
}

const StyledAvatarImage = styled(MuiAvatar)({
  width: '30px',
  height: '30px',
  
});

const Avatar = ({ src }: AvatarProps) => {
  return <StyledAvatarImage src={src} alt={AVATAR_ALT_TEXT} />;
};

export default Avatar;
