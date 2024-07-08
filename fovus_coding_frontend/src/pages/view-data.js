import React, { useEffect, useState } from 'react'
import { getApihandler } from '../apiHandler';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import WestIcon from '@mui/icons-material/West';
const columns = [
    { id: "S. No.", label: "S. No.", minWidth: 100 },
    
    {
      id: "Text",
      label: "Text",
     
    },
    {
        id: "Image",
        label: "Image",
        align:"center"
       
      },
   
  ];
export default function ViewData() {

    // useState
    const [data,setData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // useeffect
    useEffect(()=>{
     getData();
    },[])

    // function
    const getData = async()=>{
      const res = await getApihandler("/getAllData");
      console.log("res",res);
      if(res.message === "Items retrieved successfully"){
        setData(res.data);
      }

    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
  return (
    <div>
        <h1>Data Table</h1>
        <a href='/'><div style={{display:"flex",alignItems:"center"}}><WestIcon sx={{padding:"10px"}}/><h3 > Add data</h3></div></a>
      <Paper sx={{ width: "100%", overflow: "hidden" ,marginTop:"40px"}}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                   
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "",
                      color: "black",
                      fontWeight: "bold",
                      textAlign:column.align,
                     
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length === 0 ?<h3>No Data</h3>: data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((val, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                        }}
                      >
                        {index + 1}.
                      </TableCell>
                      <TableCell>{val.text}</TableCell>
                      <TableCell sx={{textAlign:"center"}}><img style={{width:"10%"}} src={val.fileUrl}/></TableCell>

                      
                     
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}
