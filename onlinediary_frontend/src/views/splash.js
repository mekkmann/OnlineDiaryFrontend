import { useAuth0 } from '@auth0/auth0-react';

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

const Splash = () => {

  const { isLoading, isAuthenticated } = useAuth0();
  const [secondary, setSecondary] = useState(false);
  {
    // for both
    if (isLoading) {
      return <Loading />;
    }

    // for authenticated
    if (isAuthenticated) {
      return (
        <div>
          <h1>PHSplashPage</h1>

          <h2>Authenticated splash page</h2>
          <h2>Will navigate to url.com/home in release</h2>
          <h2>Don't care about this too much</h2>
        </div>
      );
    };

    // for unauthenticated
    let expandOrShrink = "";
    if (secondary) expandOrShrink = "Shrink";
    if (!secondary) expandOrShrink = "Expand";
    const expandList = () => {
      setSecondary(!secondary);
    }

    return (
      <Container maxWidth='md' >
        <Grid2 container justifyContent={"center"} sx={{ marginBottom: 5 }} >

          <Grid2 xs={'auto'} sx={{ paddingTop: 5 }} >
            <Typography variant='h3' component={'div'} >Why keep a diary?</Typography>
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
                    primary="1. IMPROVES SELF-AWARENESS"
                    secondary={secondary ? 'Keeping a diary offers the chance to improve self-awareness. Getting to know yourself in this way provides an opportunity to communicate your feelings in a tangible way. Current research looking into diary keeping has shown that the act of writing provides a tool that can unlock the thoughts and feelings you might be disregarding.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="2. MANAGES YOUR NERVES"
                    secondary={secondary ? 'Keeping a diary has the ability to reduce our anxieties and settle our nerves in potentially stressful situations. To keep a diary of your thoughts and emotions surrounding situations you feel uncomfortable with, enables you to develop a sense of control and therefore reduce your anxiety.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="3. IMPROVES METACOGNITION"
                    secondary={secondary ? 'Metacognition is the ability to critically analyse how you think. This means evaluating how well you performed and what caused your successes and failures. Research has shown that people who keep diaries experience greater metacognition through the development of self-regulatory strategies such as effective preparation, monitoring and self-questioning.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="4. REDUCES PROCRASTINATION"
                    secondary={secondary ? 'Diaries have the ability to improve an individual’s time management. There is a well-known thinking bias called planning fallacy, which states that we underestimate the time it will take to complete a future task. By using a diary, we can evaluate our past experiences in order to better plan for tasks ahead.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="5. IMPROVES MEMORY"
                    secondary={secondary ? 'Diaries have been shown to improve our working memory by allowing us to retain information for greater periods of time. The American Psychology Association state that although effects were modest, expressive writing frees up space in the working memory by removing intrusive and avoidant thoughts.'
                      : null}
                  />
                </ListItem>
              </Card>

              <Card sx={{ marginBottom: 1 }}>
                <ListItem>
                  <ListItemText
                    primary="6. IMPROVES WELL-BEING"
                    secondary={secondary ? 'Evidence has indicated that keeping a diary can make you happier. Whilst it seems like a trivial task, diary keeping has shown to reduce depressive thoughts and behaviours by providing the writer with increased control. This useful intervention has also been seen to have long-lasting effects on mental health. It’s not just a quick fix.'
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
            <Typography variant='h6' component={'div'} >Easy, accessible and instant.</Typography>
          </Grid2>

          <Grid2 xs={12} sx={{ paddingTop: 5 }} display='flex' justifyContent={'center'}>
            <SignupButton />
          </Grid2>
        </Grid2>
      </Container>
    );
  }
}


export default Splash;
