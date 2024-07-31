

import React from 'react';
import { FormControl, Box, Select, MenuItem,Pagination,useMediaQuery} from '@mui/material';

type Order = 'asc' | 'desc';

interface RowData {
  id: number;
  name: string;
  age: string;
  occupation: string;
}

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  page: number;
  isDarkMode:boolean;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setOrderDirection: (OrderDirection: Order) => void;
  setOrderBy: (OrderBy: keyof RowData) => void;
}

const CustomePagination: React.FC <PaginationProps> = ({
  totalRows, rowsPerPage, page, setPage, setRowsPerPage,setOrderDirection,setOrderBy,isDarkMode
}) => {

  const textColor = isDarkMode ? 'white' : 'black';
  const backgroundColor = isDarkMode ? 'white' : '#b71c1c';
  const totalPages = Math.ceil(totalRows / rowsPerPage)
  const isSmallScreen = useMediaQuery('(max-width:650px)');
  const backgroundColor1 =  isDarkMode ? '#474745' : '#eeeeee';
  const isSmallScreen1 = useMediaQuery('(max-width:430px)');
  

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setOrderDirection('asc')
    setOrderBy('id')
    setPage(value);
  };

  return (
    <Box flexDirection={isSmallScreen ? 'column' : 'row'} sx ={{display:'flex',alignItems:'center', marginTop:'10px',justifyContent:'space-between',width:'100%'}}>
      <Box>
          <FormControl  fullWidth>
          <Select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx = {{backgroundColor:backgroundColor1,color:textColor}}
          >
            {[5, 10, 25].map((rows) => (
            <MenuItem  key={rows} value={rows}>
                {rows} 
            </MenuItem>
            ))}
        </Select>
        </FormControl>
      </Box>

      <Box marginTop={isSmallScreen ? '10px' : '0px'}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              size={isSmallScreen1 ?  'small' : 'medium'}
              showFirstButton
              showLastButton
              siblingCount={1}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: textColor, // Change the default text color
                },
                '& .MuiPaginationItem-page.Mui-selected': {
                  color: 'black', // Change the text color for selected page
                  backgroundColor: backgroundColor , // Change the background color for selected page
                },
                '& .MuiPaginationItem-page:hover': {
                  backgroundColor: '#eeeeee', // Change the hover color for page numbers
                },
              }}
            />
      </Box>

    </Box>

  );
};

export default CustomePagination;




