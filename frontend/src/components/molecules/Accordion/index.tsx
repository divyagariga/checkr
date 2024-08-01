import * as React from 'react';
import { Accordion as MuiAccordion, styled } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';
import theme from '../../../Theme/theme';
import ExpandIcon from '../../../../public/assets/icons/expand.svg';

interface AccordionProps {
  heading: string;
  children: React.ReactNode;
}

const StyledAccordion = styled(MuiAccordion)({
  border: 'none',
  borderRadius: '0.5rem',
  boxShadow: '0px 4px 28px 0px rgba(45, 45, 47, 0.10)',
  background: theme.palette.white.main,
  '&.MuiAccordion-root:before': {
    backgroundColor: 'white',
  },
});

const AccordionSummaryContainer = styled(AccordionSummary)({
  height: '3.5rem',
});

const StyledAccordionDetails = styled(AccordionDetails)({
  padding: '0px',
});

const Accordion = ({ heading, children }: AccordionProps) => {
  return (
    <StyledAccordion data-testid="accordion">
      <AccordionSummaryContainer
        expandIcon={<Icon src={ExpandIcon} alt="expand-icon" />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="subtitle1" color={theme.palette.textEmphasis.dark}>
          {heading}
        </Typography>
      </AccordionSummaryContainer>
      <StyledAccordionDetails>{children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default Accordion;
