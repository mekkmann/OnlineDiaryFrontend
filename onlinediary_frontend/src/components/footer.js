import { AppBar, Typography, Stack, Link } from "@mui/material";

import '../App.css';

const Footer = () => {
    return (
        <div className='footer'>
        <AppBar position="static" sx={{ bgcolor: "#FFFFFF" }}>
            <Stack direction="row" justifyContent={"space-evenly"} alignItems={"center"} sx={{ height: 50 }}>
                <Typography variant="p" component={"p"}>OnlineDiary: a Mekkmann Project</Typography>

                <Link href="https://github.com/mekkmann" underline="hover" target='_blank' rel="noopener">
                    {'GitHub'}
                </Link>

                <Link href="https://twitter.com/othermekkmann" underline="hover" target='_blank' rel="noopener">
                    {'Twitter'}
                </Link>

                <Typography variant="p" component={"p"}>Contact: alex.p.liljekvist@gmail.com</Typography>

            </Stack>
        </AppBar>
        </div>
    );
};

export default Footer;
