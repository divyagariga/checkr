import { Checkbox as MuiCheckbox, CheckboxProps, styled } from '@mui/material';
import Icon from '../Icon';
import UncheckedIcon from '../../../../public/assets/icons/unchecked.svg';
import CheckedIcon from '../../../../public/assets/icons/checked.svg';
import { CHECKED_ICON_ALT, UNCHECKED_ICON_ALT } from '../../../utils/constants';

interface ICheckboxProps extends CheckboxProps {}

const StyledCheckBoxIcon = styled(Icon)({
  width: '24px',
  height: '24px',
});

const Checkbox = ({ onChange, checked, name }: ICheckboxProps) => {
  return (
    <MuiCheckbox
      data-testid="checkbox"
      onChange={onChange}
      checked={checked}
      name={name}
      icon={<StyledCheckBoxIcon src={UncheckedIcon} alt={UNCHECKED_ICON_ALT} />}
      checkedIcon={
        <StyledCheckBoxIcon src={CheckedIcon} alt={CHECKED_ICON_ALT} />
      }
    />
  );
};

export default Checkbox;
