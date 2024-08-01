import type { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import PaginationFooter from '.';

const meta: Meta<typeof PaginationFooter> = {
  title: 'Molecules/PaginationFooter',
  component: PaginationFooter,
};

const handleClickAction = action('clicked pagination icons');

export default meta;

export const Pagination = () => {
  return (
    <div style={{ width: '70%' }}>
      <PaginationFooter
        perPageRecordsCount={10}
        totalRecordsCount={30}
        handlePageNumberIconClick={handleClickAction}
        handleLeftArrowIconClick={handleClickAction}
        handleRightArrowIconClick={handleClickAction}
      />
    </div>
  );
};
