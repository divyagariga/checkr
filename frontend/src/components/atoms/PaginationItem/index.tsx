import styled from '@emotion/styled';
import { Box } from '@mui/material';
import theme from '../../../Theme/theme';
import Typography from '../Typography';

interface PaginationItemProps {
  label: number;
  handleClick: (label: number) => void;
  isPaginationItemActive: boolean;
}

const StyledPaginationItem = styled(Box)(
  ({ isPaginationItemActive }: { isPaginationItemActive: boolean }) => ({
    padding: '4px 10px',
    width: 'fit-content',
    cursor: 'pointer',
    backgroundColor: isPaginationItemActive
      ? theme.palette.primary300.main
      : theme.palette.white.main,
  }),
);

const PaginationItem = ({
  label,
  handleClick,
  isPaginationItemActive,
}: PaginationItemProps) => {
  const handleItemClick = () => {
    handleClick(label);
  };
  const textColor = isPaginationItemActive
    ? theme.palette.primary500.main
    : theme.palette.textEmphasis.dark;

  return (
    <StyledPaginationItem
      onClick={handleItemClick}
      isPaginationItemActive={isPaginationItemActive}
      data-testid="pagination-item"
    >
      <Typography variant={'body2'} color={textColor}>
        {label}
      </Typography>
    </StyledPaginationItem>
  );
};

export default PaginationItem;
