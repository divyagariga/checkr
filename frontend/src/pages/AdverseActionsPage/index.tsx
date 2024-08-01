import { Box } from '@mui/material';
import Header from '../../components/molecules/Header';
import AdverseAction from '../../components/organisms/AdverseAction';
import SideNavigationBar from '../../components/organisms/SideNav';
import BaseTemplate from '../../components/templates/BaseTemplate';
import { PAGE_HEADINGS } from '../../utils/constants';

const AdverseActionsPage = () => {
  return (
    <Box data-testid="adverse-action-page">
      <BaseTemplate
        sideNav={<SideNavigationBar />}
        header={
          <Header
            type={'Plain'}
            heading={PAGE_HEADINGS.ADVERSE_ACTION}
            showBackButton={false}
          />
        }
        content={<AdverseAction />}
      />
    </Box>
  );
};

export default AdverseActionsPage;
