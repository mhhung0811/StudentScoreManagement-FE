import './table.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export function UserTable({data}) {
    const [page, setPage] = React.useState(0);
    const [minPage, setMinPage] = React.useState(0);
    const [maxPage, setMaxPage] = React.useState(0);
    const [isBackable, setBackable] = React.useState(false);
    const [isForwardable, setForwardable] = React.useState(false);

    const handlePreviousPage = () => {
        if (page - 1 <= minPage)
          setBackable(false);
        else
          setBackable(true);
    
        if (page - 1 >= maxPage)
          setForwardable(false);
        else
          setForwardable(true);
    
        setPage(page - 1);
    }
    
    const handleNextPage = () => {
    if (page + 1 <= minPage)
        setBackable(false);
    else
        setBackable(true);

    if (page + 1 >= maxPage)
        setForwardable(false);
    else
        setForwardable(true);

    setPage(page + 1);
    }

    return (
        <div className="table-content">
            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map && data.map((user) => (
                        <TableRow
                            key={user.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover={true}
                            // onClick={(event) => handleSelectSubject(event, subject)}
                        >
                            <TableCell component="th" scope="row">
                            {user.id}
                            </TableCell>
                            <TableCell align="right">{user.name}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                <div className="pagination">
                    <IconButton aria-label="back" disabled={!isBackable} color="primary" onClick={handlePreviousPage}>
                    <ArrowBackIosIcon/>
                    </IconButton>
                    <div className='pageNo'>{page}</div>
                    <IconButton aria-label="next" disabled={!isForwardable} color="primary" onClick={handleNextPage}>
                    <ArrowForwardIosIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}