import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../components/loading';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import { ThemeProvider } from '@emotion/react';
import ColorTheme from '../components/color-theme';

import { Container, Typography, TextField, Button, Card } from '@mui/material';

// import FormModal from '../components/form-modal';

const UpdateBook = () => {
  const location = useLocation();
  const { state } = location;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();

  const UpdateBook = async (newBook) => {

    const token = await getAccessTokenSilently();
    const body = JSON.stringify(newBook);
    await fetch(
      `${serverUrl}/api/Book/${user.family_name}/${state.id}?title=${title}&description=${description}`,
      {
        method: 'PUT',
        mode: 'cors',
        accept: 'text/plain',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: body,
      }
    )

  };


  const navigate = useNavigate();
  const handleSubmit = () => {

    const newBook = {
      Title: title,
      Description: description,
      UserId: user.family_name,
    }
      UpdateBook(newBook);

      navigate(-1);

  }
  let titleErrorText = '';
  const isTitleError = () => {
    if (title.length === 0) {
      titleErrorText = 'Please choose a title'
      return true;
    } else {
      titleErrorText = '';
      return false;
    }
  }
  let descriptionErrorText = '';
  const isDescriptionError = () => {
    if (description.length === 0) {
      descriptionErrorText = 'Please describe this book'
      return true;
    } else {
      descriptionErrorText = '';
      return false;
    }
  }

  // const isOpen = () => {
  //   if (isDescriptionError || isTitleError) {
  //     setOpen(true);
  //   }
  // }
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      {/* <FormModal open={open} handleClose={handleClose} /> */}

      <Typography variant='h3' component='div' sx={{ marginTop: 5 }}>Update Book</Typography>
      <Card sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        marginTop: 5,
        paddingBottom: 3,

      }}>

        <TextField id='title' label='New Title' variant='outlined' sx={{ width: '92%', marginTop: 3 }} error={false} helperText={"Current title: " + state.title} onChange={e => setTitle(e.target.value)} />
        <TextField id='title' label='New Description' variant='outlined' multiline error={false} helperText={"Current Description:" + state.description} sx={{ width: '92%', marginTop: 3 }} onChange={e => setDescription(e.target.value)} />
        <Typography variant='p' component='div' sx={{ marginTop: 3, color: '#3a3a3a' }}>*a field that hasn't been altered will retain its current value</Typography>
        <ThemeProvider theme={ColorTheme}>
          <Button variant='outlined' color='primary' onClick={() => handleSubmit()} sx={{ marginTop: 3 }}>Update</Button>
        </ThemeProvider>

      </Card>
    </Container>
  );

};

export default withAuthenticationRequired(UpdateBook, {
  onRedirecting: () => <Loading />,
});