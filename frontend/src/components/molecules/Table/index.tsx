import { Box, styled } from '@mui/material';
import theme from '../../../Theme/theme';
import { TABLE_COLUMNS_KEYS, TABLE_ROWS_KEYS } from '../../../utils/constants';
import Typography from '../../atoms/Typography';
import { TableType } from '../../../utils/types';

interface TableTypeProps {
  tableType?: TableType;
}

interface TableProps extends TableTypeProps {
  tableData: React.ReactNode[][];
  tableHeadingData: string[];
  tableColumnWidth: string;
}

interface StyledTableColumnProps {
  width: string;
  isHeading: boolean;
}

interface TableRowProps extends TableTypeProps {
  isHeading: boolean;
}

const StyledTableRowBox = styled(Box)(
  ({ isHeading, tableType }: TableRowProps) => ({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: tableType === 'court-search' ? '15%' : '9%',
    borderBottom: `1px solid ${theme.palette.stroke.main}`,
    backgroundColor: isHeading
      ? theme.palette.primary100.main
      : theme.palette.white.main,
  }),
);

const StyledTableBox = styled(Box)(({ tableType }: TableTypeProps) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: tableType === 'court-search' ? '100%' : '87%',
}));

const StyledTableColumnBox = styled(Box)(
  ({ width, isHeading }: StyledTableColumnProps) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isHeading
      ? theme.palette.primary100.main
      : theme.palette.white.main,
    width: width,
    paddingLeft: '12px',
  }),
);

const Table = ({
  tableData,
  tableHeadingData,
  tableColumnWidth,
  tableType,
}: TableProps) => {
  return (
    <StyledTableBox data-testid="table">
      <StyledTableRowBox isHeading={true} tableType={tableType}>
        {tableHeadingData?.map((eachHead) => (
          <StyledTableColumnBox
            key={eachHead}
            data-testid="table-column"
            width={tableColumnWidth}
            isHeading={true}
          >
            <Typography
              variant="caption1"
              color={theme.palette.textEmphasis.main}
            >
              {eachHead}
            </Typography>
          </StyledTableColumnBox>
        ))}
      </StyledTableRowBox>
      {tableData?.map((eachRow: React.ReactNode[], rowindex) => (
        <StyledTableRowBox
          key={TABLE_ROWS_KEYS + rowindex}
          isHeading={false}
          tableType={tableType}
        >
          {eachRow?.map((eachColumnData: React.ReactNode, index) => (
            <StyledTableColumnBox
              key={TABLE_COLUMNS_KEYS + index}
              data-testid="table-column"
              width={tableColumnWidth}
              isHeading={false}
            >
              {eachColumnData}
            </StyledTableColumnBox>
          ))}
        </StyledTableRowBox>
      ))}
    </StyledTableBox>
  );
};

export default Table;
