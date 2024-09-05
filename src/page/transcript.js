import Box from '@mui/material/Box';

const TranscriptPage = () => {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}
            >
            </Box>
            <div>
                transcript
            </div>
        </div>
    )
}

export default TranscriptPage