import React, { useCallback, useState } from 'react';
import { Box, styled } from '@mui/material';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Checkbox from '../../atoms/Checkbox';
import theme from '../../../Theme/theme';
import {
  ADJUDICATION,
  CANDIDATES_ADJUDICATION_FILTER_OPTIONS,
  CANDIDATES_STATUS_FILTER_OPTIONS,
  FILTER_BUTTON_TEXT,
  FILTER_POPUP_HEADING,
  INITIAL_PRE_ADVERSE_CHECKBOXES,
  PREADVERSE_ACTION_STATUS_FILTER_OPTIONS,
} from '../../../utils/constants';

import FilterIcon from '../../../../public/assets/icons/filter.svg';
import Typography from '../../atoms/Typography';
import { FilterTypes } from '../../../utils/enums';

import { FilterPopupVariants } from '../../../utils/types';

interface FilterVariantProps {
  variant: FilterPopupVariants;
}

interface FilterPopupProps extends FilterVariantProps {
  candidateStatusCheckedOptions: boolean[];
  candidateAdjudicationCheckedOptions: boolean[];
  handleCandidateStatusCheckbox?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;

  handleCandidateAdjudicationCheckbox?: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

const FilterContainer = styled(Box)({
  width: '17.813rem',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.stroke.main}`,
  backgroundColor: theme.palette.white.main,
  boxShadow: '0px 4px 16px 0px rgba(3, 3, 3, 0.04)',
  position: 'absolute',
  top: '16%',
  right: '2%',
});

const FilterHeader = styled(Box)({
  borderBottom: `1px solid ${theme.palette.stroke.main}`,
  padding: '0.75rem 1rem',
});
const FilterMenu = styled(Box)({
  padding: '1rem',
});
const FilterOptionsStyled = styled(Box)({
  paddingTop: '0.75rem',
});
const CheckBoxAndFilterLabelStyled = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

const AdjudicationFilterOptionsMenuStyled = styled(Box)({
  paddingTop: '0.5rem',
});

const FilterPopup = ({
  variant,
  candidateStatusCheckedOptions,
  handleCandidateStatusCheckbox,
  candidateAdjudicationCheckedOptions,
  handleCandidateAdjudicationCheckbox,
}: FilterPopupProps) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [preAdverseCheckboxes, setPreAdverseCheckboxes] = useState<boolean[]>(
    INITIAL_PRE_ADVERSE_CHECKBOXES,
  );

  const filterClickHandler = useCallback(() => {
    setOpenFilter(!openFilter);
  }, [openFilter]);

  const handleAdverseActionCheckboxesClick = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = e.target;
      const index = Number(name);
      setPreAdverseCheckboxes((prevPreAdverseCheckboxes) =>
        prevPreAdverseCheckboxes.map((item, i) => (i === index ? !item : item)),
      );
    },
    [],
  );

  const renderFilterCandidateMenu = () => {
    return (
      <>
        <Typography variant="body1" color={theme.palette.textEmphasis.light}>
          {FilterTypes.status}
        </Typography>
        <FilterOptionsStyled>
          {CANDIDATES_STATUS_FILTER_OPTIONS.map(
            (option: string, index: number) => (
              <CheckBoxAndFilterLabelStyled key={option}>
                <Checkbox
                  name={String(index)}
                  checked={candidateStatusCheckedOptions[index]}
                  onChange={handleCandidateStatusCheckbox}
                />
                <Typography
                  variant="caption2"
                  color={theme.palette.textEmphasis.dark}
                >
                  {option}
                </Typography>
              </CheckBoxAndFilterLabelStyled>
            ),
          )}
          <AdjudicationFilterOptionsMenuStyled>
            <Typography
              variant="body1"
              color={theme.palette.textEmphasis.light}
            >
              {ADJUDICATION}
            </Typography>
            {CANDIDATES_ADJUDICATION_FILTER_OPTIONS.map(
              (option: string, index: number) => (
                <CheckBoxAndFilterLabelStyled key={option}>
                  <Checkbox
                    name={String(index)}
                    checked={candidateAdjudicationCheckedOptions[index]}
                    onChange={handleCandidateAdjudicationCheckbox}
                  />
                  <Typography
                    variant="caption2"
                    color={theme.palette.textEmphasis.dark}
                  >
                    {option}
                  </Typography>
                </CheckBoxAndFilterLabelStyled>
              ),
            )}
          </AdjudicationFilterOptionsMenuStyled>
        </FilterOptionsStyled>
      </>
    );
  };

  const renderPreAdverseFilterMenu = () => {
    return (
      <>
        <Typography variant="body1" color={theme.palette.textEmphasis.light}>
          {FilterTypes.status}
        </Typography>
        <FilterOptionsStyled>
          {PREADVERSE_ACTION_STATUS_FILTER_OPTIONS.map((option, index) => (
            <CheckBoxAndFilterLabelStyled key={option}>
              <Checkbox
                name={String(index)}
                checked={preAdverseCheckboxes[index]}
                onChange={handleAdverseActionCheckboxesClick}
              />
              <Typography
                variant="caption2"
                color={theme.palette.textEmphasis.dark}
              >
                {option}
              </Typography>
            </CheckBoxAndFilterLabelStyled>
          ))}
        </FilterOptionsStyled>
      </>
    );
  };

  const FilterMenuContent = () => {
    switch (variant) {
      case 'candidate':
        return renderFilterCandidateMenu();
      case 'preadverseActions':
        return renderPreAdverseFilterMenu();
    }
  };

  return (
    <>
      <Button
        variant="contained"
        label={FILTER_BUTTON_TEXT}
        color="white"
        labelVariant="body1"
        labelColor={theme.palette.textEmphasis.main}
        border={`1px solid ${theme.palette.stroke.main}`}
        boxShadow="none"
        startIcon={<Icon src={FilterIcon} alt="filter-icon" />}
        handleClick={filterClickHandler}
      />
      {openFilter && (
        <FilterContainer data-testid="filter-menu">
          <FilterHeader>
            <Typography variant="body1" color={theme.palette.textEmphasis.main}>
              {FILTER_POPUP_HEADING}
            </Typography>
          </FilterHeader>
          <FilterMenu>{FilterMenuContent()}</FilterMenu>
        </FilterContainer>
      )}
    </>
  );
};

export default FilterPopup;
