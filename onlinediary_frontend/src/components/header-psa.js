import { Typography } from "@mui/material";

import '../App.css';

const HeaderPSA = () => {
    return (
        <div className='header-psa'>
            <Typography variant="h4" component={"h4"}>Hello, dear users!</Typography>
            <br/>
            <Typography variant="h5" component={"h5"}>Due to technical difficulties the database will be down for an indefinite period of time.</Typography>
            <Typography variant="h5" component={"h5"}>We apologize for the inconvenience and thank you for you patience.</Typography>
        </div>
    );
};

export default HeaderPSA;