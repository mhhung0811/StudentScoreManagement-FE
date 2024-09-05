import Box from '@mui/material/Box';

const SubjectTypePage = () => {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}
            >
            </Box>
            <div>
                subject type
            </div>
        </div>
    )
}

export default SubjectTypePage