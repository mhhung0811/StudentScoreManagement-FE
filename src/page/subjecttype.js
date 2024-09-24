import Box from '@mui/material/Box';
import { SubjectTypeTable } from '../components/table/table';

const SubjectTypePage = ({data}) => {
    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}
                >
                </Box>  
                <SubjectTypeTable data={data}/>
            </div>
        </div>
    )
}

export default SubjectTypePage