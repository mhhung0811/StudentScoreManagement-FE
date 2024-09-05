import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Combobox } from 'react-widgets';

export function UserFormDialog({ title, content, onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {content}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const name = formJson.name;
            onSubmit(name);
            // console.log(name);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function TranscriptFormDialog({ title, content, onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {content}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const year = formJson.year;
            const semester = formJson.semester;
            onSubmit(year, semester);
            // console.log(name);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="year"
            name="year"
            label="Year"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="semester"
            name="semester"
            label="Semester"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function SubjectTypeFormDialog({ title, content, onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {content}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const code = formJson.code;
            const name = formJson.name;
            onSubmit(code, name);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="code"
            name="code"
            label="Code"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function SubjectFormDialog({ title, content, subjecttypes, onSubmit }) {
  const [open, setOpen] = React.useState(false);
  const [subject, setSubject] = React.useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSubject();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {content}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            var scoreQT;
            var scoreTH;
            var scoreGK;
            var scoreCK;
            try {
              scoreQT = parseFloat(formJson.qt)
            } catch {
              scoreQT = 0;
            }
            try {
              scoreTH = parseFloat(formJson.th)
            } catch {
              scoreTH = 0;
            }
            try {
              scoreGK = parseFloat(formJson.gk)
            } catch {
              scoreGK = 0;
            }
            try {
              scoreCK = parseFloat(formJson.ck)
            } catch {
              scoreCK = 0;
            }
            onSubmit(subject.id, scoreQT, scoreTH, scoreGK, scoreCK);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Combobox
            name='subjecttype'
            id='subjecttype'
            data={subjecttypes}
            dataKey="id"
            textField='code'
            onSelect={(subject) => setSubject(subject)}
          />
          <div>{subject && subject.name}</div>
          <TextField
            autoFocus
            error = {false}
            margin="dense"
            id="qt"
            name="qt"
            label="QT"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="th"
            name="th"
            label="TH"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="gk"
            name="gk"
            label="GK"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="ck"
            name="ck"
            label="CK"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function UpdateSubjectFormDialog({ 
  title, 
  subjecttypes, 
  defaultsubject,
  open, 
  onSubmit, 
  handleClose,
  handleDelete
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            var scoreQT;
            var scoreTH;
            var scoreGK;
            var scoreCK;
            try {
              scoreQT = parseFloat(formJson.qt)
            } catch {
              scoreQT = 0;
            }
            try {
              scoreTH = parseFloat(formJson.th)
            } catch {
              scoreTH = 0;
            }
            try {
              scoreGK = parseFloat(formJson.gk)
            } catch {
              scoreGK = 0;
            }
            try {
              scoreCK = parseFloat(formJson.ck)
            } catch {
              scoreCK = 0;
            }
            onSubmit(subjecttypes.id, scoreQT, scoreTH, scoreGK, scoreCK);
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div>{defaultsubject.code}</div>
          <div>{defaultsubject.name}</div>
          <TextField
            autoFocus
            margin="dense"
            id="qt"
            name="qt"
            label="QT"
            fullWidth            
            defaultValue={defaultsubject.qt}
          />
          <TextField
            autoFocus
            margin="dense"
            id="th"
            name="th"
            label="TH"
            fullWidth            
            defaultValue={defaultsubject.th}
          />
          <TextField
            autoFocus
            margin="dense"
            id="gk"
            name="gk"
            label="GK"
            fullWidth            
            defaultValue={defaultsubject.gk}
          />
          <TextField
            autoFocus
            margin="dense"
            id="ck"
            name="ck"
            label="CK"
            fullWidth            
            defaultValue={defaultsubject.ck}
          />
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='error' onClick={() => {handleDelete(defaultsubject.id); handleClose();}}>
            Delete
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function DeleteSubjectTypeForm({ title, content, subjecttypes, onSubmit }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color='error' onClick={handleClickOpen}>
        {content}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const subjectType = formJson.subjecttype;
            subjecttypes.map(subject => {
              if (subject.code == subjectType)
                onSubmit(subject.id);
            })
            handleClose();
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Combobox 
            id='subjecttype'
            name='subjecttype'
            label='Subjecttype'
            data={subjecttypes}
            dataKey="id"
            textField="code"
          />
          <div>----</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color='error' type="submit">Delete</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export function AlertDialog({ title, content, open, handleClose }) {
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle>          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
}