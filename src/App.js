import 'react-widgets'
import "react-widgets/styles.css";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Chip from '@mui/material/Chip';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import './App.css';
import { Combobox } from 'react-widgets';
import { AlertDialog, DeleteSubjectTypeForm, SubjectFormDialog, SubjectTypeFormDialog, TranscriptFormDialog, UpdateSubjectFormDialog, UserFormDialog } from './components/form/form';
import SearchBar from './components/searchBar/searchBar';
import PermanentDrawerLeft from './components/drawer/drawer';

function createSubjectData(id, subjectTypeId, name, code, qt, th, gk, ck) {
  return { id, subjectTypeId, name, code, qt, th, gk, ck };
}

const BASE_URL = "http://localhost:8080/api"

function App() {

  const drawerWidth = 240;

  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const [years, setYears] = React.useState([]);
  const [year, setYear] = React.useState(null);
  const [semesters, setSemesters] = React.useState([]);
  const [semester, setSemester] = React.useState();
  const [subjectTypes, setSubjectTypes] = React.useState([]);
  const [transcriptId, setTranscriptId] = React.useState();
  const [subjects, setSubjects] = React.useState([]);
  const [subject, setSubject] = React.useState();
  const [searchKey, setSearchKey] = React.useState("");

  const [allChip, setAllChip] = React.useState(true);
  const [nameChip, setNameChip] = React.useState(false);
  const [yearChip, setYearChip] = React.useState(false);
  const [semesterChip, setSemesterChip] = React.useState(false);
  const [subjectNameChip, setSubjectNameChip] = React.useState(false);
  const [subjectIdChip, setSubjectIdChip] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertTitle, setAlertTitle] = React.useState();
  const [alertContent, setAlertContent] = React.useState();

  const [page, setPage] = React.useState(0);
  const [minPage, setMinPage] = React.useState(0);
  const [maxPage, setMaxPage] = React.useState(0);
  const [isBackable, setBackable] = React.useState(false);
  const [isForwardable, setForwardable] = React.useState(false);

  const fetchYears = async (user) => {
    const response = await fetch(`${BASE_URL}/user/year/${user.id}`);
    const years = await response.json();
    setYears(years);
  }

  const handleSelectUser = (value) => { 
    
    setUser(value);
    setYear(null);
    setSemesters([]);
    setSemester(null);
    setTranscriptId();
    setSubjects([]);
    fetchYears(value);
  }

  const handleSelectYear = (value) => {
    const fetchSemester = async () => {
      const response = await fetch(`${BASE_URL}/user/semester?id=${user.id}&year=${value}`)
      const semesters = await response.json();
      setSemesters(semesters)
    }
    setYear(value);
    setSemester(null);
    setTranscriptId();
    fetchSemester();
  }

  const fetchSubjectType = async (subjectTypeId) => {
    try {
      const response = await fetch(`${BASE_URL}/subjecttype/id/${subjectTypeId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch subject type');
      }
      return await response.json();
    } catch (e) {
      console.error(`Error fetching subject type for ID ${subjectTypeId}:`, e);
      throw e;
    }
  }

  const handleSelectSemester = (value) => {
    const fetchTranscript = async () => {
      try {
        const transcriptResponse = await fetch(`${BASE_URL}/transcript?userId=${user.id}&year=${year}&semester=${value}`);
        if (!transcriptResponse.ok) {
          throw new Error('Failed to fetch transcript');
        }
        const transcriptData = await transcriptResponse.json();

        setTranscriptId(transcriptData.id);

        const subjectsResponse = await fetch(`${BASE_URL}/subject/${transcriptData.id}`);
        if (!subjectsResponse.ok) {
          throw new Error('Failed to fetch subjects');
        }
        const subjectsData = await subjectsResponse.json();
        
        const res = [];
        if (subjectsData && Array.isArray(subjectsData)) {
          for (const subject of subjectsData) {
            try {
              const subjectType = await fetchSubjectType(subject.subjectTypeId);
              const obj = createSubjectData(
                subject.id,
                subjectType.id,
                subjectType.name, 
                subjectType.code, 
                subject.scoreQT, 
                subject.scoreTH, 
                subject.scoreGK, 
                subject.scoreCK
              );
              res.push(obj);
            } catch (e) {
              console.error(`Error processing subject with ID ${subject.id}:`, e);
            }
          }
        }
        setSubjects(res);
        setPage(0);
        setBackable(false);
        setForwardable(false);
        setMaxPage(0);
        // console.log(res);
      } catch (e) {
        console.error('Error fetching transcript or subjects:', e);
      }
    }

    setSemester(value);
    fetchTranscript();
  }

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

  const handleCreateTranscript = async (year, semester) => {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         'userId': user.id,
         'year' : year,
         'semester': semester
        })
    };
    try {
      const response = await fetch(`${BASE_URL}/transcript/create`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to create trancsript");
        setAlertTitle("Transcript");
        setAlertContent("Fail to create trancsript");
        setOpenAlert(true);
      }
      const data = await response.json();
      setYear(null);
      setSemesters([]);
      setSemester(null);
      setTranscriptId();
      setSubjects([]);
      fetchYears(user);
    } catch (e) {
      // console.error(`Error create transcript for user name ${user.name}:`, e);
      // throw e;
      setAlertTitle("Transcript");
        setAlertContent("Fail to create trancsript");
        setOpenAlert(true);
    }
  }

  const handleCreateSubjectType = async (code, name) => {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         'code' : code,
         'name': name
        })
    };
    try {
      const response = await fetch(`${BASE_URL}/subjecttype/create`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to create subject type");
        setAlertTitle("Subject Type");
        setAlertContent("Fail to create subject type");
        setOpenAlert(true);
      }
      const data = await response.json();
      setSubjectTypes(subjectTypes.concat(data));

    } catch (e) {
      // console.error(`Error create subject type for subject code ${code}:`, e);
      setAlertTitle("Subject Type");
      setAlertContent("Fail to create subject type");
      setOpenAlert(true);
      // throw e;
    }
  }

  const handleCreateSubject = async (subjecttypeId, qt, th, gk, ck) => {
    const requestOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         'transcriptId' : transcriptId,
         'subjectTypeId': subjecttypeId,
         'scoreQT': qt,
         'scoreTH': th,
         'scoreGK': gk,
         'scoreCK': ck
        })
    };
    try {
      const response = await fetch(`${BASE_URL}/subject/create`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to create subject");
        setAlertTitle("Subject");
        setAlertContent("Fail to create subject");
        setOpenAlert(true);
      }
      const data = await response.json();

      // console.log(data.subjectTypeId)
      const subjectTypeObj = await fetchSubjectType(data.subjectTypeId);

      const obj = createSubjectData(
        data.id,
        data.subjectTypeId,
        subjectTypeObj.name,
        subjectTypeObj.code,
        data.scoreQT,
        data.scoreTH,
        data.scoreGK,
        data.scoreCK
      )
      
      setSubjects(subjects.concat(obj));
    } catch (e) {
      // console.error(`Error create subject for transcript id ${transcriptId}:`, e);
      setAlertTitle("Subject");
      setAlertContent(`Error create subject for transcript id ${transcriptId}`);
      setOpenAlert(true);
      // throw e;
    }
  }

  const handleUpdateSubject = async (subjecttypeId, qt, th, gk, ck) => {
    const requestOption = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         'id': subject.id,
         'transcriptId' : transcriptId,
         'subjectTypeId': subjecttypeId,
         'scoreQT': qt,
         'scoreTH': th,
         'scoreGK': gk,
         'scoreCK': ck
        })
    };
    try {
      const response = await fetch(`${BASE_URL}/subject/update`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to create subject");\
        setAlertTitle("Subject");
        setAlertContent("Fail to update subject");
        setOpenAlert(true);
      }
      const data = await response.json();
      const subjectTypeObj = await fetchSubjectType(data.subjectTypeId);
      const obj = createSubjectData(
        data.id,
        data.subjectTypeId,
        subjectTypeObj.name,
        subjectTypeObj.code,
        data.scoreQT,
        data.scoreTH,
        data.scoreGK,
        data.scoreCK
      )

      var objs = []
      subjects.map(subject => {
        if(subject.id == data.id) {
          objs.push(obj)
        }
        else {
          objs.push(subject);
        }
      })
      setSubjects(objs);

    } catch (e) {
      // console.error(`Error create subject for transcript id ${transcriptId}:`, e);
      setAlertTitle("Subject");
      setAlertContent("Fail to update subject");
      setOpenAlert(true);
      // throw e;
    }
  }

  const handleDeleteSubject = async (id) => {
    const requestOption = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`${BASE_URL}/subject/delete/${id}`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to delete subject");
        setAlertTitle("Subject");
        setAlertContent("Fail to delete subject");
        setOpenAlert(true);
      }
      let data;
      if (response.headers.get('Content-Length') > 0) {
        data = await response.json();
      } else {
        data = null; // No content to parse
      }
      var objs = []
      subjects.map(subject => {
        if (subject.id != id)
          objs.push(subject);
      })
      setSubjects(objs);

      setAlertTitle("Subject");
      setAlertContent("Success delete subject");
      setOpenAlert(true);

    } catch (e) {
      // console.error(`Error delete subject with subject id ${transcriptId}:`, e);
      // throw e;
      setAlertTitle("Subject");
      setAlertContent("Fail to delete subject");
      setOpenAlert(true);
    }
  }

  const handleDeleteSubjectType = async (id) => {
    const requestOption = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`${BASE_URL}/subjecttype/delete/${id}`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to delete subject");
        setAlertTitle("Subject Type");
        setAlertContent("Fail to delete subject type");
        setOpenAlert(true);
      }
      let data;
      if (response.headers.get('Content-Length') > 0) {
        data = await response.json();
      } else {
        data = null; // No content to parse
      }
      var objs = []
      subjectTypes.map(subjectType => {
        if (subjectType.id != id)
          objs.push(subjectType);
      })
      setSubjectTypes(objs);

      var subjectObjs = []
      subjects.map(subject => {
        if (subject.subjectTypeId != id)
          subjectObjs.push(subject);
      })
      setSubjects(subjectObjs);

      setAlertTitle("Subject Type");
      setAlertContent("Success delete subject type");
      setOpenAlert(true);

    } catch (e) {
      // console.error(`Error delete subject with subject id ${transcriptId}:`, e);
      // throw e;
      setAlertTitle("Subject Type");
      setAlertContent("Fail to delete subject type");
      setOpenAlert(true);
    }
  }

  const handleDeleteTranscript = async (id) => {
    const requestOption = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`${BASE_URL}/transcript/delete/${id}`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to delete subject");
        setAlertTitle("Transcript");
        setAlertContent("Fail to delete transcript");
        setOpenAlert(true);
      }
      let data;
      if (response.headers.get('Content-Length') > 0) {
        data = await response.json();
      } else {
        data = null; // No content to parse
      }
      setYear(null);
      setSemesters([]);
      setSemester(null);
      setTranscriptId();
      setSubjects([]);
      fetchYears(user);

      setAlertTitle("Transcript");
      setAlertContent("Success delete transcript");
      setOpenAlert(true);

    } catch (e) {
      // console.error(`Error delete subject with subject id ${transcriptId}:`, e);
      // throw e;
      setAlertTitle("Transcript");
      setAlertContent("Fail to delete transcript");
      setOpenAlert(true);
    }
  }

  const handleDeleteUser = async (id) => {
    const fetchUsers = async () => {
      const response = await fetch( BASE_URL + '/user');
      const users = await response.json();
      setUsers(users);
    }
    const requestOption = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`${BASE_URL}/user/delete/${id}`, requestOption);
      if (!response.ok) {
        // throw new Error("Fail to delete subject");
        setAlertTitle("User");
        setAlertContent("Fail to delete user");
        setOpenAlert(true);
      }
      let data;
      if (response.headers.get('Content-Length') > 0) {
        data = await response.json();
      } else {
        data = null; // No content to parse
      }
      fetchUsers();
      setUser();

      setAlertTitle("User");
      setAlertContent("Success delete user");
      setOpenAlert(true);

    } catch (e) {
      // console.error(`Error delete subject with subject id ${transcriptId}:`, e);
      // throw e;
      setAlertTitle("Subject");
      setAlertContent("Fail to delete subject");
      setOpenAlert(true);
    }
  }

  const handleSelectSubject = (event, subject) => {
    setOpen(true);
    setSubject(subject);
  }
  const handleClose = () => {
    setSubject();
    setOpen(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setAlertTitle();
    setAlertTitle();
  }

  const handleSearch = () => {
    if (searchKey == "") {
      const fetchTranscript = async () => {
        try {
          const transcriptResponse = await fetch(`${BASE_URL}/transcript?userId=${user.id}&year=${year}&semester=${semester}`);
          if (!transcriptResponse.ok) {
            throw new Error('Failed to fetch transcript');
          }
          const transcriptData = await transcriptResponse.json();
  
          setTranscriptId(transcriptData.id);
  
          const subjectsResponse = await fetch(`${BASE_URL}/subject/${transcriptData.id}`);
          if (!subjectsResponse.ok) {
            throw new Error('Failed to fetch subjects');
          }
          const subjectsData = await subjectsResponse.json();
          
          const res = [];
          if (subjectsData && Array.isArray(subjectsData)) {
            for (const subject of subjectsData) {
              try {
                const subjectType = await fetchSubjectType(subject.subjectTypeId);
                const obj = createSubjectData(
                  subject.id,
                  subjectType.id,
                  subjectType.name, 
                  subjectType.code, 
                  subject.scoreQT, 
                  subject.scoreTH, 
                  subject.scoreGK, 
                  subject.scoreCK
                );
                res.push(obj);
              } catch (e) {
                console.error(`Error processing subject with ID ${subject.id}:`, e);
              }
            }
          }
          setMaxPage(0);
          setPage(0)
          setBackable(false);
          setForwardable(false);
          setSubjects(res);
          // console.log(res);
        } catch (e) {
          console.error('Error fetching transcript or subjects:', e);
        }
      }
  
      fetchTranscript();
    }
    else {
      const fetchSearchSubjects = async () => {
        const requestOption = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
             'pageNo': 0,
             'pageSize' : 5
            })
        };
        try {
          const response = await fetch(`${BASE_URL}/subject/search?transcriptId=${transcriptId}&key=${searchKey}`, requestOption);
          if (!response.ok) {
            // throw new Error("Fail to create subject");
            setAlertTitle("Subject");
            setAlertContent(`Not found any with ${searchKey}`);
            setOpenAlert(true);
          }
          const retrieveData = await response.json();
          const res = []
          if (retrieveData.content && Array.isArray(retrieveData.content)) {
            for (const subject of retrieveData.content) {
              try {
                const subjectType = await fetchSubjectType(subject.subjectTypeId);
                const obj = createSubjectData (
                  subject.id,
                  subjectType.id,
                  subjectType.name, 
                  subjectType.code, 
                  subject.scoreQT, 
                  subject.scoreTH, 
                  subject.scoreGK, 
                  subject.scoreCK
                )
                res.push(obj);
              } catch (e) {
                console.error(`Error processing subject with ID ${subject.id}:`, e);
              }
            }

            setMaxPage(retrieveData.totalPages);
            setPage(0);
            setBackable(false);
            if (maxPage > 1) {
              setForwardable(true);
            }
            else 
              setForwardable(false)
            setSubjects(res);
          }
        } catch (e) {
          console.error('Error fetching transcript or subjects:', e);
        }
      }

      fetchSearchSubjects();
    }
  }

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

  const handleAllChipClick = () => {
    setAllChip(true);
    setNameChip(false);
    setYearChip(false);
    setSemesterChip(false);
    setSubjectNameChip(false);
    setSubjectIdChip(false);
  }

  const handleChipClick = (chip) => {
    setAllChip(false);
    switch(chip) {
      case "name":
        if (nameChip ==  true)
          setNameChip(false);
        else
          setNameChip(true);
        break;
      case "year":
        if (yearChip ==  true)
          setYearChip(false);
        else
          setYearChip(true);
        break;
      case "semester":
        if (semesterChip ==  true)
          setSemesterChip(false);
        else
          setSemesterChip(true);
        break;
      case "subjectName":
        if (subjectNameChip ==  true)
          setSubjectNameChip(false);
        else
          setSubjectNameChip(true);
        break;
      case "subjectId":
        if (subjectIdChip ==  true)
          setSubjectIdChip(false);
        else
          setSubjectIdChip(true);
        break;
    }
  }

  React.useEffect(() => {
    const fetchSearchSubjects = async (value) => {
      const requestOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
           'pageNo': value,
           'pageSize' : 5
          })
      };

      setSubjects([]);
      try {
        const response = await fetch(`${BASE_URL}/subject/search?transcriptId=${transcriptId}&key=${searchKey}`, requestOption);
        if (!response.ok) {
          // throw new Error("Fail to create subject");
          setAlertTitle("Subject");
          setAlertContent(`Not found any with ${searchKey}`);
          setOpenAlert(true);
        }
        const retrieveData = await response.json();
        const res = []
        if (retrieveData.content && Array.isArray(retrieveData.content)) {
          for (const subject of retrieveData.content) {
            try {
              const subjectType = await fetchSubjectType(subject.subjectTypeId);
              const obj = createSubjectData (
                subject.id,
                subjectType.id,
                subjectType.name, 
                subjectType.code, 
                subject.scoreQT, 
                subject.scoreTH, 
                subject.scoreGK, 
                subject.scoreCK
              )
              res.push(obj);
            } catch (e) {
              console.error(`Error processing subject with ID ${subject.id}:`, e);
            }
          }

          setMaxPage(retrieveData.totalPages - 1);
          console.log(maxPage);
          setSubjects(res);
        }
      } catch (e) {
        console.error('Error fetching transcript or subjects:', e);
      }
    }
    fetchSearchSubjects(page)
  }, [page])

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch( BASE_URL + '/user');
      const users = await response.json();
      setUsers(users);
    }
    const fetchSubjectTypes = async () => {
      const response = await fetch( BASE_URL + '/subjecttype');
      const subjecttypes = await response.json();
      setSubjectTypes(subjecttypes);
    }

    fetchUsers();
    fetchSubjectTypes();
  }, []);

  return (
    <div className="App">
      {subject && <UpdateSubjectFormDialog
          title="Subject"
          subjecttypes={subjectTypes}
          defaultsubject={subject}
          handleClose={handleClose}
          handleDelete={handleDeleteSubject}
          onSubmit={handleUpdateSubject}
          open={open}
      />}
      <AlertDialog
        title={alertTitle}
        content={alertContent}
        open={openAlert}
        handleClose={handleCloseAlert}
      />

      <div className="sidebar">
        <PermanentDrawerLeft/>
      </div>

      <div className="content">
        <AppBar
          position="fixed"
          sx={{ padding: '8px', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: 'background.default' }}
        >
          {transcriptId && 
            <SearchBar 
              searchKey={searchKey} 
              setSearchKey={setSearchKey} 
              handleSearch={handleSearch}/>
          }
          <div className="filter-chip">
            <Chip label="All" color={allChip ? "primary" : "default"} onClick={() => handleAllChipClick()}/>
            <Chip label="Name" color={nameChip ? "primary" : "default"} onClick={() => handleChipClick("name")}/>
            <Chip label="Year" color={yearChip ? "primary" : "default"} onClick={() => handleChipClick("year")}/>
            <Chip label="Semester" color={semesterChip ? "primary" : "default"} onClick={() => handleChipClick("semester")}/>
            <Chip label="Subject Name" color={subjectNameChip ? "primary" : "default"} onClick={() => handleChipClick("subjectName")}/>
            <Chip label="Subject ID" color={subjectIdChip ? "primary" : "default"} onClick={() => handleChipClick("subjectId")}/>
        </div>
        </AppBar>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
          >
        </Box>
        <div className="utility">
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 15 }}
        >
        </Box>
          <div className="filter">
            <div className="username">
              <div className='text'>Name:</div>
              <Combobox 
                className="usernameCbb" 
                data={users}
                dataKey="id"
                textField="name"
                value={user}
                onSelect={handleSelectUser}
                />
            </div>
            <div className="username">
              <div className='text'>Year:</div>
              <Combobox 
                className="usernameCbb" 
                data={years}
                value={year}
                onSelect={handleSelectYear}
                />
            </div>
            <div className="username">
              <div className='text'>Semester:</div>
              <Combobox 
                className="usernameCbb" 
                data={semesters}
                value={semester}
                onSelect={handleSelectSemester}
                />
            </div>
          </div>
          <div className="delete">
            <div className="button">
              {user && <Button variant="outlined" color="error" onClick={() => handleDeleteUser(user.id)}>
                Delete User
              </Button>}
            </div>
            <div className="button">
              {transcriptId && <Button variant="outlined" color="error" onClick={() => handleDeleteTranscript(transcriptId)}>
                Delete Transcript
              </Button>}
            </div>
            <div className="button">
                <DeleteSubjectTypeForm
                  title="Subject Types"
                  content="Delete Subject Type"
                  subjecttypes={subjectTypes}
                  onSubmit={handleDeleteSubjectType}
                />
            </div>
          </div>
          <div className="add">
            <div className='button'>
              <UserFormDialog title="User" content="Add User" onSubmit={handleCreateUser}/>
            </div>
            <div className='button'>
              {user && <TranscriptFormDialog title="Transcript" content="Add Transcript" onSubmit={handleCreateTranscript}/>}
            </div>
            <div className='button'>
              <SubjectTypeFormDialog title="Subject Type" content="Add Subject Type" onSubmit={handleCreateSubjectType}/>
            </div>
            <div className='button'>
              {transcriptId && <SubjectFormDialog title="Subject" content="Add Subject" subjecttypes={subjectTypes} onSubmit={handleCreateSubject}/>}
            </div>
          </div>
        </div>

        <div className="table-content">
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
        </div>
      </div>
      
    </div>
  );
}

export default App;
