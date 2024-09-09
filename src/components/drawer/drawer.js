import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import TableRowsIcon from '@mui/icons-material/TableRows';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BookIcon from '@mui/icons-material/Book';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const drawerWidth = 240;

export default function PermanentDrawerLeft( {setState, resetChips} ) {
    const navigate = useHistory();

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {navigate.push("/"); setState("user"); resetChips()}}>
                <ListItemIcon>
                  <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {navigate.push("/transcript"); setState("transcript"); resetChips()}}>
                <ListItemIcon>
                  <TableRowsIcon/>
                </ListItemIcon>
                <ListItemText primary="Transcript" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {navigate.push("/subjecttype"); setState("subjecttype"); resetChips()}}>
                <ListItemIcon>
                  <MenuBookIcon/>
                </ListItemIcon>
                <ListItemText primary="Subject Type" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {navigate.push("/subject"); setState("subject"); resetChips()}}>
                <ListItemIcon>
                  <BookIcon/>
                </ListItemIcon>
                <ListItemText primary="Subject" />
                <Link to="/subject"/>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
      </Box>
    </Box>
  );
}
