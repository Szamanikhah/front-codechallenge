// DataTable.tsx
import MenuListComposition from "../components/DropdownMenue"
import SearchComponent from "../components/SearchComponent";
import React, { useState } from 'react';
import CustomePagination from "../components/Pagination";
import CustomeTable from "../components/DataTableComponent";
import { rows,columns } from "../data/data";
import { RowData,ColumnData,Order } from '../types/dataTypes';

import {
  FormControlLabel,
  Box,
  Switch,
} from '@mui/material';

interface Props {
  isDarkMode:boolean;
  handleChange : (event: React.ChangeEvent<HTMLInputElement>) => void;

}

const DataTableContainer:React.FC <Props> = ({
  isDarkMode,handleChange
}) => {


  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [data, setData] = useState<RowData[]>(rows);
  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof RowData>('id'); 
  const [shown, setShown] = useState<ColumnData[]>(columns);
  const [searchText, setSearchText] = useState('');


  


  const toggleColumn = (id: number) => {
    setShown(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, show: !item.show } : item
      )
    );
  };


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchText(value);

    const filteredData = rows.filter((row) => {
      return (
        row.name.toString().toLowerCase().includes(value) ||
        row.age.toString().toLowerCase().includes(value) ||
        row.occupation.toString().toLowerCase().includes(value) 
      );
    });

    setData(filteredData);
  };

  

  const sliceData = data.slice((page-1) * rowsPerPage, (page-1) * rowsPerPage + rowsPerPage)


  const handleSortRequest = (property: keyof RowData) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


   const sortedPaginatedData = sliceData.sort((a, b) => {
    if (a[orderBy] < b[orderBy]) {
      return orderDirection === 'asc' ? -1 : 1;
    }
    if (a[orderBy] > b[orderBy]) {
      return orderDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  
    const backgroundColor2 = isDarkMode ? '#21201F' : 'white';
    const textColor = isDarkMode ? 'white' : 'black';


  return (
    <Box sx={{marginTop:'5vh',height:'auto',width:'100%',display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center',backgroundColor:backgroundColor2}}>
        <Box  sx={{display:"flex", justifyContent:'space-around',width:'90%'}}>
            <Box sx={{display:'flex'}}>
              <FormControlLabel sx={{color:textColor}}
                control={<Switch checked={isDarkMode} onChange={handleChange} />}
                label="Dark Mode"
              />
            </Box> 
            <Box sx={{display:"flex", justifyContent:'space-around',width:'40%',borderRadius:'10%'}}>
                <SearchComponent searchText={searchText}  handleSearch={handleSearch} isDarkMode={isDarkMode}></SearchComponent>
                <MenuListComposition  ColumnDatas={shown} toggleColumn={toggleColumn}   isDarkMode = {isDarkMode}  />
        
            </Box>
        </Box>

  `   <CustomeTable 
        sortedPaginatedData={sortedPaginatedData}
        isDarkMode={isDarkMode} 
        orderBy={orderBy} 
        orderDirection={orderDirection} 
        handleSortRequest={handleSortRequest}
        shown={shown}
      ></CustomeTable>`

      <Box  sx = {{display:'flex',width:'90%',justifyContent:'center',hight:'400px',marginTop:'3vh'}}>
        <CustomePagination
          totalRows={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setOrderDirection ={setOrderDirection}
          setOrderBy = {setOrderBy}
          isDarkMode = {isDarkMode}   
        />
      </Box>
    </Box>
  );
};

export default DataTableContainer;













