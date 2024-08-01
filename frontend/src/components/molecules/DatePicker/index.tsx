import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useState } from 'react';
import {
  PopperPropsStyles,
  StyledDatePicker,
  StyledIconButton,
  PaperPropsStyles,
} from './styles';
import Icon from '../../atoms/Icon';
import LeftArrow from '../../../../public/assets/icons/leftArrowCalendar.svg';
import RightArrow from '../../../../public/assets/icons/rightArrowCalendar.svg';
import Calender from '../../../../public/assets/icons/calendar.svg';
import { Stack, styled } from '@mui/material';
import theme from '../../../Theme/theme';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';

export interface IDatePickerProps {
  label: string;
  onChange?: (selectedDate: unknown) => void;
  width?: string;
  datePickerHelperText?: string;
}

const StackStyled = styled(Stack)({
  gap: '0.5rem',
  width: '48%',
});

const getCalendar = () => <Icon src={Calender} alt={'calender'} />;

const DatePicker = ({
  label,
  onChange,
  datePickerHelperText,
}: IDatePickerProps) => {
  const [date, setDate] = useState<unknown>();
  const handleChange = (value: unknown) => {
    setDate(value);
    onChange?.(value);
  };
  const getArrow = (icon: string, alt: string) => {
    return (
      <StyledIconButton>
        <Icon src={icon} alt={alt} />
      </StyledIconButton>
    );
  };

  return (
    <StackStyled>
      <Typography variant="body2" color={theme.palette.textEmphasis.main}>
        {label}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledDatePicker
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!datePickerHelperText}
              helperText={datePickerHelperText}
            />
          )}
          PopperProps={PopperPropsStyles}
          PaperProps={PaperPropsStyles}
          components={{
            OpenPickerIcon: getCalendar,
            LeftArrowIcon: () => getArrow(LeftArrow, 'leftArrow'),
            RightArrowIcon: () => getArrow(RightArrow, 'rightArrow'),
          }}
          showDaysOutsideCurrentMonth
          views={['year', 'month', 'day']}
          value={date}
          onChange={handleChange}
        />
      </LocalizationProvider>
    </StackStyled>
  );
};

export default DatePicker;
