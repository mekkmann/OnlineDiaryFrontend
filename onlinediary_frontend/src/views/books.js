import React, { useState, useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { withAuthenticationRequired } from '@auth0/auth0-react';

import Grid2 from '@mui/material/Unstable_Grid2';
import { Container, Typography } from '@mui/material';

import AddBookButton from '../components/addbook-button';
import Loading from '../components/loading';
import BookCard from '../components/book-card';


const Books = () => {

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently, user } = useAuth0();

  const [bookList, setBookList] = useState([]);

  const booksProtected = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        // `${serverUrl}/api/Book/${user.family_name}`,
        `https://onlinediarydatabaseapi.azurewebsites.net/api/Book/${user.family_name}`,
        // 'https://onlinediarydatabaseapi.azurewebsites.net/api/Book/public-OnlyGivesYouOne',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = await response.json();
      setBookList(responseData);
      console.log(responseData);
    } catch (error) {
      console.log(error);
      console.log('You need authorization');
    }
  };

  useEffect(() => {
    booksProtected();
  }, []);
  console.log(bookList.length);
  if (bookList.length === 0) {

    return (
      <Container maxWidth='md' >
        <Grid2 container justifyContent='center' sx={{ marginBottom: 5 }} >

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
            <Typography variant='h3' component={'div'} >Your Diaries</Typography>
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
            <AddBookButton />
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
            <Typography variant='h4' component={'div'} >No Diaries yet, add one?</Typography>
          </Grid2>



        </Grid2>
      </Container>
    );
  };

  if (bookList.length > 0) {

    return (
      <Container maxWidth='md' >
        <Grid2 container justifyContent='center' sx={{ marginBottom: 5 }} >

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
            <Typography variant='h3' component={'div'} >Your Diaries</Typography>
          </Grid2>
          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
            <AddBookButton />
          </Grid2>

          {bookList.map((book) => (
            <BookCard book={book} bookList={bookList} setBookList={setBookList} key={book.id} />
          ))}

        </Grid2>
      </Container>

    );
  };

};

export default withAuthenticationRequired(Books, {
  onRedirecting: () => <Loading />,
});