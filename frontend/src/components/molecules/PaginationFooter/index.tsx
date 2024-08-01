import { useState } from 'react';

import styled from '@emotion/styled';
import { Box } from '@mui/material';

import { NUMBER_OF_RECORDS_PER_PAGE } from '../../../utils/constants';
import { getNumberOfRecords } from '../../../utils/helperFunctions';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';

import DropdownIcon from '../../../../public/assets/icons/dropdownicon.svg';
import LeftArrowIcon from '../../../../public/assets/icons/leftArrowIcon.svg';
import RightArrowIcon from '../../../../public/assets/icons/rightArrowIcon.svg';
import PaginationItem from '../../atoms/PaginationItem';

import theme from '../../../Theme/theme';

interface PaginationFooterProps {
  perPageRecordsCount: number;
  totalRecordsCount: number;
  handlePageNumberIconClick?: (index: number) => void;
  handleLeftArrowIconClick?: () => void;
  handleRightArrowIconClick?: () => void;
}

const StyledPaginationFooterBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  height: '56px',
  alignItems: 'center',
  padding: '10px 12px 10px 12px',
  backgroundColor: theme.palette.white.main,
  borderRadius: '0px 0px 8px 8px',
});

const StyledFooterLeftBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: '8px',
  alignItems: 'center',
});

const StyledDropdownBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: '4px',
  padding: '12px 2px 12px 2px',
  border: `.8px solid ${theme.palette.stroke.main}`,
  backgroundColor: theme.palette.white.main,
  height: '26px',
  width: '110px',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledRecordCountSpan = styled('span')({
  color: theme.palette.textEmphasis.dark,
});

const PaginationFooter = ({
  perPageRecordsCount,
  totalRecordsCount,
  handlePageNumberIconClick,
  handleLeftArrowIconClick,
  handleRightArrowIconClick,
}: PaginationFooterProps) => {
  const numberOfPages: number =
    perPageRecordsCount > 0 ? Math.ceil(totalRecordsCount / 10) : 1;
  const [isPaginationItemsActive, setIsPaginationItemsActive] = useState<
    boolean[]
  >(Array.from({ length: numberOfPages }, (_, i) => i === 0));

  const handlePaginationButton = (index: number) => {
    index--;
    setIsPaginationItemsActive((prevState) =>
      prevState.map((item, i) => i === index),
    );
    if (handlePageNumberIconClick) {
      handlePageNumberIconClick(index - 1);
    }
  };
  const getPaginationNumberButtons = () => {
    const paginationItems = Array.from({ length: numberOfPages }, (_, i) => (
      <PaginationItem
        key={i}
        label={i + 1}
        handleClick={(label: number) => {
          handlePaginationButton(label);
        }}
        isPaginationItemActive={isPaginationItemsActive[i]}
      />
    ));
    return paginationItems;
  };

  return (
    <StyledPaginationFooterBox data-testid="pagination-footer">
      <StyledFooterLeftBox>
        <Typography
          variant={'caption2'}
          color={theme.palette.textEmphasis.main}
        >
          <StyledRecordCountSpan>{perPageRecordsCount}</StyledRecordCountSpan>{' '}
          {getNumberOfRecords(totalRecordsCount)}
        </Typography>
        <StyledDropdownBox>
          <Typography
            variant={'caption2'}
            color={theme.palette.textEmphasis.dark}
          >
            {NUMBER_OF_RECORDS_PER_PAGE}
          </Typography>
          <Icon src={DropdownIcon} alt={'drop-down'} />
        </StyledDropdownBox>
      </StyledFooterLeftBox>
      <StyledFooterLeftBox>
        <Icon
          src={LeftArrowIcon}
          alt={'leftarrow'}
          handleClick={handleLeftArrowIconClick}
          disabled={handleLeftArrowIconClick === undefined}
        />
        {getPaginationNumberButtons()}
        <Icon
          src={RightArrowIcon}
          alt={'rightarrow'}
          handleClick={handleRightArrowIconClick}
          disabled={handleRightArrowIconClick === undefined}
        />
      </StyledFooterLeftBox>
    </StyledPaginationFooterBox>
  );
};

export default PaginationFooter;
