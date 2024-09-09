import * as React from 'react';
import { AlertDialog, UserFormDialog } from '../components/form/form';

import Box from '@mui/material/Box';

const BASE_URL = "http://localhost:8080/api"

const UserPage = () => {

    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertTitle, setAlertTitle] = React.useState();
    const [alertContent, setAlertContent] = React.useState();
    const [users, setUsers] = React.useState([]);

    const handleCreateUser = async (name) => {
        const requestOption = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 'name': name })
        };
        try {
          const response = await fetch(`${BASE_URL}/user/create`, requestOption);
          if (!response.ok) {
            // throw new Error("Fail to create user");
            setAlertTitle("User");
            setAlertContent("Fail to create user");
            setOpenAlert(true);
          }
          const data = await response.json();
          setUsers(users.concat(data));
        } catch (e) {
          // console.error(`Error create user for user name ${name}:`, e);
          // throw e;
          setAlertTitle("User");
          setAlertContent("Fail to create user");
          setOpenAlert(true);
        }
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
        setAlertTitle();
        setAlertTitle();
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <AlertDialog
                title={alertTitle}
                content={alertContent}
                open={openAlert}
                handleClose={handleCloseAlert}
            />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}
            >
            </Box>
            <div>
                <div className="utility">
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}
                        >
                    </Box>
                </div>

                {/* <div className="table-content">
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}
                >
                </Box>
                    <div className="table">
                        <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Subject name</TableCell>
                                <TableCell align="right">Subject code</TableCell>
                                <TableCell align="right">QT</TableCell>
                                <TableCell align="right">TH</TableCell>
                                <TableCell align="right">GK</TableCell>
                                <TableCell align="right">CK</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {subjects.map((subject) => (
                                <TableRow
                                key={subject.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                hover={true}
                                onClick={(event) => handleSelectSubject(event, subject)}
                                >
                                <TableCell component="th" scope="row">
                                    {subject.name}
                                </TableCell>
                                <TableCell align="right">{subject.code}</TableCell>
                                <TableCell align="right">{subject.qt}</TableCell>
                                <TableCell align="right">{subject.th}</TableCell>
                                <TableCell align="right">{subject.gk}</TableCell>
                                <TableCell align="right">{subject.ck}</TableCell>
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
                </div> */}
            </div>
        </div>
    )
}

export default UserPage