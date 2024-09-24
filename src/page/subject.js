import Box from '@mui/material/Box';
import { SubjectTable } from '../components/table/table';

const SubjectPage = ({data}) => {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}
                >
                </Box>  
                <SubjectTable data={data}/>
            </div>
        </div>
    )
}

export default SubjectPage