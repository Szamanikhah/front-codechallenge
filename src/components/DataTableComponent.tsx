// EmptyComponent.tsx
import React from 'react';
import { RowData,ColumnData,Order } from '../types/dataTypes';


import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel, 
  } from '@mui/material';


interface dataTableProps {
    sortedPaginatedData: RowData[]
    isDarkMode:boolean
    orderDirection:Order;
    orderBy: keyof RowData;
    handleSortRequest: (property:keyof RowData) => void;
    shown: ColumnData[];
    

}

const CustomeTable: React.FC<dataTableProps> = ({sortedPaginatedData,orderBy,orderDirection,isDarkMode,handleSortRequest,shown}) => {

    const shownId = shown[0]
    const shownName = shown[1]
    const shownAge = shown[2]
    const shownEmail = shown[3]

    const backgroundColor = isDarkMode ? '#474745' : '#fff';
    const backgroundColor1 =  isDarkMode ? '#474745' : '#eeeeee';
    const textColor = isDarkMode ? 'white' : 'black';
    const textColor1 = isDarkMode ? 'white' : '#b71c1c';


  return(
        <TableContainer component={Paper}
        sx={{
          width: '90%',
          overflowX: 'auto',
          maxHeight:'65vh',
          minHeight:'300px',
          marginTop: '5vh',
          backgroundColor:backgroundColor
        }}>
      <Table stickyHeader sx={{height:'100%'}}>
        <TableHead>
          <TableRow>
          {shown.map(shown=>(shown.show && <TableCell key={shown.name} sx={{flex:1,backgroundColor:backgroundColor1,color:textColor1}}> 
            <TableSortLabel
                active={orderBy === shown.name}
                direction ={orderBy === shown.name ? orderDirection : 'asc'}
                onClick={() => handleSortRequest(shown.name as keyof RowData)}
              >
                {shown.name.charAt(0).toUpperCase() + shown.name.slice(1)}
              </TableSortLabel>
           </TableCell>))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPaginatedData.map((row) => (
            <TableRow key={row.id}>
                {shownId?.show && (<TableCell sx={{flex:1,backgroundColor:backgroundColor,color:textColor}} align="left">{row.id}</TableCell>)}
                {shownName?.show &&(<TableCell sx={{ flex:1,backgroundColor:backgroundColor,color:textColor}} align="left">{row.name}</TableCell> )}
                {shownAge?.show &&(<TableCell sx={{flex:1,backgroundColor:backgroundColor,color:textColor}} align="left">{row.age}</TableCell>  )}  
               {shownEmail?.show &&(<TableCell sx={{flex:1,backgroundColor:backgroundColor,color:textColor}}>{row.occupation}</TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomeTable;



