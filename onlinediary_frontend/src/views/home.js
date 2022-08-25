

import { useState } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2';
import { Button, Container, Typography, Card } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { ThemeProvider } from '@emotion/react';

import Loading from '../components/loading';
import SignupButton from '../components/signup-button';
import ColorTheme from '../components/color-theme';
import BooksButton from '../components/books-button';

import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';

const Home = () => {

  const { isLoading } = useAuth0();
  
  const [secondary, setSecondary] = useState(false);

  if (isLoading) {
    return <Loading />;
  }
  let expandOrShrink = "";
  if (secondary) expandOrShrink = "Shrink";
  if (!secondary) expandOrShrink = "Expand";
  const expandList = () => {
    setSecondary(!secondary);
  }
  return (
    <Container maxWidth='md' sx={{marginBottom: 5}}>
        <Grid2 container justifyContent={"center"} sx={{ marginBottom: 5 }} >

          <Grid2 xs={'auto'} sx={{ paddingTop: 5 }} display='flex' justifyContent='center' >
            <Typography variant='h3' component={'div'} >Welcome, how's your day been? </Typography>

          </Grid2>
          <Grid2 xs={'auto'} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>
          <Typography variant='h4' component={'div'} >Try these tips to help you get started with journaling</Typography>

          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent={'center'}>
            <ThemeProvider theme={ColorTheme} >
              <Button variant={'outlined'} color={'primary'} onClick={expandList} >{expandOrShrink} List</Button>
            </ThemeProvider>
          </Grid2>


          <Grid2 xs={6} sx={{ paddingTop: 5 }} >
            <List dense={false}>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="1. Try to write every day"
                    secondary={secondary ? 'Set aside a few minutes every day to write. This will help you to write in your journal regularly.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="2. Make it easy"
                    secondary={secondary ? "We've got you covered on this one. This is probably the No.1 reason this app exists, to make journaling possible WITHOUT the need to bring a physical journal everywhere you go."
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="3. Write or draw whatever feels right"
                    secondary={secondary ? "Your journal doesn't need to follow any certain structure. It's your own private place to discuss and create whatever you want to express your feelings. Let the words and ideas flow freely. Don't worry about spelling mistakes or what other people might think."
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="4. Use your journal as you see fit"
                    secondary={secondary ? "You don't have to share your journal with anyone. If you do want to share some of your thoughts with trusted friends and loved ones, you could show them parts of your journal."
                      : null}
                  />
                </ListItem>
              </Card>

            </List>
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent={'center'}>
            <Typography variant='h4' component={'div'} >Self-improvement within reach.</Typography>
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent={'center'}>
            <Typography variant='h6' component={'div'} >We believe in you.</Typography>
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent={'center'}>
            <BooksButton />
          </Grid2>
        </Grid2>
      </Container>
  );

}

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loading />,
});
