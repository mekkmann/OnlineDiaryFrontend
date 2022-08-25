import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../components/loading';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import { ThemeProvider } from '@emotion/react';
import ColorTheme from '../components/color-theme';

import { Container, Typography, TextField, Button, Card } from '@mui/material';

// import FormModal from '../components/form-modal';

const UpdateEntry = () => {

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  
  const location = useLocation();
  const { state } = location;

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();

  const UpdateBook = async (newBook) => {

    const token = await getAccessTokenSilently();
    const body = JSON.stringify(newBook);
    await fetch(
      `${serverUrl}/api/BookEntry/${state.id}?title=${title}&text=${text}&rating=${rating}`,
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
      Text: text,
      TodaysRating: rating,
      UserId: user.family_name,
    }
      UpdateBook(newBook);

      navigate(-1);

  }
  // let titleErrorText = '';
  // const isTitleError = () => {
  //   if (title.length === 0) {
  //     titleErrorText = 'Please choose a title'
  //     return true;
  //   } else {
  //     titleErrorText = '';
  //     return false;
  //   }
  // }
  // let textErrorText = '';
  // const isTextError = () => {
  //   if (text.length === 0) {
  //     textErrorText = 'Please describe this book'
  //     return true;
  //   } else {
  //     textErrorText = '';
  //     return false;
  //   }
  // }
  // let ratingErrorText = "Current Text: " + state.text;
  // const isRatingError = () => {
  //   if (isNaN(rating) || rating > 10 || rating < 1 || rating.length > 2 ) {
  //     ratingErrorText = 'Please choose a number between 1-10'
  //     return true;
  //   } else {
  //     ratingErrorText = "Current Text: " + state.text;
  //     return false;
  //   }
  // }

  // const isOpen = () => {
  //   if (isTextError || isTitleError || isRatingError) {
  //     setOpen(true);
  //   }
  // }
  // const [open, setOpen] = useState(false);
  // const handleClose = () => setOpen(false);

  return (
    <Container maxWidth='sm' sx={{ textAlign: 'center' }}>
      {/* <FormModal open={open} handleClose={handleClose} /> */}

      <Typography variant='h3' component='div' sx={{ marginTop: 5 }}>Update Entry</Typography>
      <Card sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'white',
        marginTop: 5,
        paddingBottom: 3,

      }}>

        <TextField id='title' label='New Title' variant='outlined' sx={{ width: '92%', marginTop: 3 }} error={false} helperText={"Current title: " + state.title} onChange={e => setTitle(e.target.value)} />
        <TextField id='text' label='New Text' variant='outlined' multiline error={false} helperText={"Current Text:" + state.text} sx={{ width: '92%', marginTop: 3 }} onChange={e => setText(e.target.value)} />
        <TextField id='rating' label='New Rating' variant='outlined' multiline error={false} helperText={"Current Text: " + state.text} sx={{ width: '92%', marginTop: 3 }} onChange={e => setRating(e.target.value)} />
        <Typography variant='p' component='div' sx={{ marginTop: 3, color: '#3a3a3a' }}>*a field that hasn't been altered will retain its current value</Typography>

        <ThemeProvider theme={ColorTheme}>
          <Button variant='outlined' color='primary' onClick={() => handleSubmit()} sx={{ marginTop: 3 }}>Update</Button>
        </ThemeProvider>

      </Card>
    </Container>
  );

};

export default withAuthenticationRequired(UpdateEntry, {
  onRedirecting: () => <Loading />,
});