import React, { useState, useEffect } from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import Loading from '../components/loading';

import { withAuthenticationRequired } from '@auth0/auth0-react';

import EntryCard from '../components/entry-card';

import { useLocation } from 'react-router-dom';

import AddEntryButton from '../components/addentry-button';

import { Container } from '@mui/system';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Typography } from '@mui/material';


const BookEntries = () => {

  const location = useLocation();
  const { state } = location;

  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const [entryList, setEntryList] = useState([]);

  const entriesProtected = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/api/BookEntry/${state.id}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const responseData = await response.json();
      setEntryList(responseData);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    entriesProtected();
  }, []);

  // return (
  //   <div>
  //     <h1>{state.title}: #{state.id}</h1>
  //     <AddEntryButton book={state.book} />
  //     <hr />

  //     {entryList.map((entry) => (
  //       <EntryCard entry={entry} />
  //     ))}

  //   </div>
  // );
  if (entryList.length === 0) {

    return (
      <Container maxWidth='md' >
      <Grid2 container justifyContent='center' sx={{ marginBottom: 5 }} >

        <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
          <Typography variant='h3' component={'div'} >Entries for: {state.book.title}</Typography>
        </Grid2>

        <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
          <AddEntryButton book={state.book}/>
        </Grid2>
        
        <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
          <Typography variant='h5' component={'div'} >Hmm.. Looks a little bit empty..</Typography>
        </Grid2>
        <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
          <Typography variant='h5' component={'div'} >Why not add an entry while you're here?</Typography>
        </Grid2>

      </Grid2>
    </Container>
  );
}
if (entryList.length > 0) {

  return (
    <Container maxWidth='md' >
    <Grid2 container justifyContent='center' sx={{ marginBottom: 5 }} >

      <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
        <Typography variant='h3' component={'div'} >Entries for: {state.book.title}</Typography>
      </Grid2>
      <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
        <AddEntryButton book={state.book}/>
      </Grid2>

      {entryList.map((entry) => (
        <EntryCard entry={entry} entryList={entryList} setEntryList={setEntryList} key={entry.id}/>
        ))}

    </Grid2>
  </Container>
);
}
  
};

export default withAuthenticationRequired(BookEntries, {
  onRedirecting: () => <Loading />,
});