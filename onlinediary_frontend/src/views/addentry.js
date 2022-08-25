import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../components/loading';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import { ThemeProvider } from '@emotion/react';
import ColorTheme from '../components/color-theme';

import { Container, Typography, TextField, Button, Card } from '@mui/material';

import FormModal from '../components/form-modal';

const AddEntry = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const postEntry = async (newEntry) => {

    const token = await getAccessTokenSilently();

    const body = JSON.stringify(newEntry);

    await fetch(
      `${serverUrl}/api/BookEntry/`,
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
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  const handleSubmit = () => {
    const newEntry = {
      Title: title,
      Text: text,
      TodaysRating: rating,
      BookId: state.id,
    }

    if(!isRatingError() && !isTextError() && !isTitleError()){
      
      postEntry(newEntry);
      
      navigate(-1);
    } else {
      isOpen();
    }
    
    
  }
  let ratingErrorText = '';
  const isRatingError = () => {
    if (isNaN(rating) || rating > 10 || rating < 1 || rating.length === 0) {
      ratingErrorText = 'Please choose a number between 1-10'
      return true;
    } else {
      ratingErrorText = '';
      return false;
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
  let textErrorText = '';
  const isTextError = () => {
    if (text.length === 0) {
      textErrorText = 'Please enter some text to your entry'
      return true;
    } else {
      textErrorText = '';
      return false;
    }
  }
  const isOpen = () => {
    if (isTextError || isTitleError || isRatingError) {
      setOpen(true);
    }
  }
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      <FormModal open={open} handleClose={handleClose}/>
      <Typography variant='h3' component='div' sx={{ marginTop: 5 }}>Add Entry to: {state.title}</Typography>
      <Card sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        marginTop: 5,
        paddingBottom: 3,

      }}>

        <TextField id='title' label='Title' variant='outlined' error={isTitleError()} helperText={titleErrorText} sx={{ width: '92%', marginTop: 3 }} onChange={e => setTitle(e.target.value)} />
        <TextField id='text' label='Text' variant='outlined' multiline error={isTextError()} helperText={textErrorText} sx={{ width: '92%', marginTop: 3 }} onChange={e => setText(e.target.value)} />
        <TextField id='todaysRating' label='Rating of the Day' variant='outlined' error={isRatingError()} helperText={ratingErrorText} sx={{ width: '92%', marginTop: 3 }} onChange={e => setRating(e.target.value)} />

        <ThemeProvider theme={ColorTheme}>
          <Button variant='outlined' color='primary' onClick={() => handleSubmit()} sx={{ marginTop: 3 }}>Add Entry</Button>
        </ThemeProvider>

      </Card>
    </Container>
  );

};

export default withAuthenticationRequired(AddEntry, {
  onRedirecting: () => <Loading />,
});