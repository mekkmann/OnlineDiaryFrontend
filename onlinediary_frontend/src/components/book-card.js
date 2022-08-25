import React from 'react';

import BookEntriesButton from './bookentry-button';

import { Button, Card, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useAuth0 } from '@auth0/auth0-react';

const BookCard = ({ book, bookList, setBookList }) => {
    const { getAccessTokenSilently } = useAuth0();
    const deleteBook = async () => {
        let success = false;
        try {
            const token = await getAccessTokenSilently();

            await fetch(
                `https://localhost:7281/api/Book/${book.id}`,
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
            const newList = bookList.filter(b => b.id !== book.id);
            setBookList(newList);
        }
    };

    return (
        <Grid2 xs={5} sx={{ paddingTop: 5 }} display='flex' justifyContent='center'>

            <Card sx={{ marginBottom: 2, textAlign: 'center', paddingX: 2, paddingY: 2 }} >
                <Typography variant='h5' component='div'>{book.title}</Typography>
                <br />
                <Typography variant='p' component='div' sx={{ color: '#636363' }}>{book.creationDate.split("T")[0]}</Typography>
                <br />
                <Typography variant='p' component='div'>{book.description}</Typography>
                <br />
                <BookEntriesButton book={book} />
                <Button variant='contained' color='error' onClick={() => deleteBook()}>Delete book</Button>
            </Card>

        </Grid2>
    );
};

export default BookCard;