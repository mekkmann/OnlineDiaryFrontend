import React from 'react';

// import { useNavigate } from 'react-router-dom';

import { useAuth0 } from '@auth0/auth0-react';

import { Card, Typography, Button } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

const EntryCard = ({ entry, setEntryList, entryList }) => {
    const { getAccessTokenSilently } = useAuth0();
    // const navigate = useNavigate();

    const deleteEntry = async () => {
        let success = false;
        try {
            const token = await getAccessTokenSilently();

            await fetch(
                `https://localhost:7281/api/BookEntry/${entry.id}`,
                {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-type': 'application/json',
                    },
                },
            )
            success = true;
        } catch (error) {
            console.log(error);
            console.log('You need authorization');
        }

        if (success) {
            const newList = entryList.filter(e => e.id !== entry.id);
            setEntryList(newList);
        }
    };
    const dateString = entry.creationDate.split('T')[0];
    const timeString = entry.creationDate.split('T')[1].split('.')[0];
    return (
        <Grid2 container xs={7} sx={{ paddingTop: 5 }} display='flex' justifyContent='center' >

            <Card sx={{ marginBottom: 2, textAlign: 'center', paddingX: 2, paddingY: 2 }} >
                <Typography variant='h5' component='div'>{entry.title}</Typography>
                <br />
                <Typography variant='p' component='div' sx={{ color: '#636363' }}>{dateString + ", " + timeString}</Typography>
                <br />
                <Typography variant='p' component='div'>{entry.text}</Typography>
                <br />
                <Typography variant='p' component='div'>Todays rating: {entry.todaysRating}/10</Typography>
                <br />
                <Button variant='contained' color='error' onClick={() => deleteEntry()}>Delete Entry</Button>
            </Card>

        </Grid2>
    );
};

export default EntryCard;