import Box from '@mui/material/Box';

const UserPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}
            >
            </Box>
            <div>
                user
            </div>
        </div>
    )
}

export default UserPage