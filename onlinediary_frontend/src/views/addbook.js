import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../components/loading';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import { ThemeProvider } from '@emotion/react';
import ColorTheme from '../components/color-theme';

import { Container, Typography, TextField, Button, Card } from '@mui/material';

import FormModal from '../components/form-modal';
import { isHostComponent } from '@mui/base';

const AddBook = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();

  const postBook = async (newBook) => {

    const token = await getAccessTokenSilently();
    const body = JSON.stringify(newBook);
    await fetch(
      `${serverUrl}/api/Book/`,
      {
        method: 'POST',
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
    if (!isDescriptionError() && !isTitleError()) {
      postBook(newBook);

      navigate(-1);
    } else {
      isOpen();
    }

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

  const isOpen = () => {
    if (isDescriptionError || isTitleError) {
      setOpen(true);
    }
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <FormModal open={open} handleClose={handleClose} />

      <Typography variant='h3' component='div' sx={{ marginTop: 5 }}>Add a New Book</Typography>
      <Card sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        marginTop: 5,
        paddingBottom: 3,

      }}>

        <TextField id='title' label='Title' variant='outlined' sx={{ width: '92%', marginTop: 3 }} error={isTitleError()} helperText={titleErrorText} onChange={e => setTitle(e.target.value)} />
        <TextField id='title' label='Description' variant='outlined' multiline error={isDescriptionError()} helperText={descriptionErrorText} sx={{ width: '92%', marginTop: 3 }} onChange={e => setDescription(e.target.value)} />

        <ThemeProvider theme={ColorTheme}>
          <Button variant='outlined' color='primary' onClick={() => handleSubmit()} sx={{ marginTop: 3 }}>Add Book</Button>
        </ThemeProvider>

      </Card>
    </Container>
  );

};

export default withAuthenticationRequired(AddBook, {
  onRedirecting: () => <Loading />,
});