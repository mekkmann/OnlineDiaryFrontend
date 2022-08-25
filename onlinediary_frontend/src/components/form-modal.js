import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const FormModal = ({open, handleClose}) => {
    
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Card sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '25%',
                    bgcolor: 'whitesmoke',
                    boxShadow: 24,
                    border: '0.2rem solid #ff3b3b',
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Form is not properly filled out
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Please fill all of the required fields
                    </Typography>
                </Card>
            </Modal>
        </div>
    );
};

export default FormModal;