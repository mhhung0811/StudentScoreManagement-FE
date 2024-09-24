import './table.css'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function UserTable({data}) {
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
            </div>
        </div>
    )
}

export function TranscriptTable({data}) {
    return (
        <div className="table-content">
            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="right">Semester</TableCell>
                            <TableCell align="right">Year</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map && data.map((transcript) => (
                        <TableRow
                            key={transcript.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover={true}
                            // onClick={(event) => handleSelectSubject(event, subject)}
                        >
                            <TableCell component="th" scope="row">
                            {transcript.userName}
                            </TableCell>
                            <TableCell align="right">{transcript.semester}</TableCell>
                            <TableCell align="right">{transcript.year}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export function SubjectTypeTable({data}) {
    return (
        <div className="table-content">
            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Subject Name</TableCell>
                            <TableCell align="right">Subject ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map && data.map((subjecttype) => (
                        <TableRow
                            key={subjecttype.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover={true}
                            // onClick={(event) => handleSelectSubject(event, subject)}
                        >
                            <TableCell component="th" scope="row">
                            {subjecttype.name}
                            </TableCell>
                            <TableCell align="right">{subjecttype.code}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export function SubjectTable({data}) {
    return (
        <div className="table-content">
            <div className="table">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>User Name</TableCell>
                            <TableCell align="right">Semester</TableCell>
                            <TableCell align="right">Year</TableCell>
                            <TableCell align="right">Subject Name</TableCell>
                            <TableCell align="right">Subject ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map && data.map((subject) => (
                        <TableRow
                            key={subject.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            hover={true}
                            // onClick={(event) => handleSelectSubject(event, subject)}
                        >
                            <TableCell component="th" scope="row">
                            {subject.userName}
                            </TableCell>
                            <TableCell align="right">{subject.semester}</TableCell>
                            <TableCell align="right">{subject.year}</TableCell>
                            <TableCell align="right">{subject.stname}</TableCell>
                            <TableCell align="right">{subject.stid}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}