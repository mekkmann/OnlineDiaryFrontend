import { AppBar, IconButton, Typography, Stack, Avatar } from "@mui/material";
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

import { NavLink } from "react-router-dom";

import { useAuth0 } from '@auth0/auth0-react';

import AuthNav from "./auth-nav";
import BooksButton from "./books-button";
import ProfileButton from "./profile-button";
import HomeButton from "./home-button";
import SignUpButton from "./signup-button";

import '../App.css';

const Navbar = () => {

    const { isAuthenticated, user } = useAuth0();

    if (!isAuthenticated) {

        return (
            <AppBar position="static" sx={{ bgcolor: "#FFFFFF", paddingLeft: 3, paddingRight: 3 }}>
                <Stack direction="row">
                    <Stack direction="row" spacing={1.5} sx={{ width: "35%" }} >
                        <NavLink to='/home'>
                            <IconButton size="large" sx={{ color: "#000000" }} aria-label="logo">
                                <AutoStoriesIcon />
                            </IconButton>
                        </NavLink>
                        <NavLink to='/home' className={'flex'}>
                            <Typography variant="h5" component="h5" alignSelf={"center"} sx={{ color: "#000000" }} >
                                OnlineDiary
                            </Typography>
                        </NavLink>
                    </Stack>

                    <Stack direction="row" spacing={5} alignSelf={"center"} justifyContent={"center"} sx={{ width: "30%" }} >
                        {/* NO NAVIGATION BUTTONS IF USER ISN'T AUTHENTICATED */}
                    </Stack>

                    <Stack direction="row" spacing={5} sx={{ width: "35%" }} alignSelf={"center"} justifyContent={"flex-end"}>
                        {/* NO NAME IF USER ISN'T AUTHENTICATED */}
                        <SignUpButton />
                        <AuthNav />
                    </Stack>

                </Stack>
            </AppBar>
        );
    };

    if (isAuthenticated) {
        const { given_name, picture } = user;
        return (
            <AppBar position="static" sx={{ bgcolor: "#FFFFFF", paddingLeft: 3, paddingRight: 3 }}>
                <Stack direction="row">

                    <Stack direction="row" spacing={1.5} sx={{ width: "35%" }} >
                        <NavLink to='/home'>
                            <IconButton size="large" sx={{ color: "#000000" }} aria-label="logo">
                                <AutoStoriesIcon />
                            </IconButton>
                        </NavLink>
                        <NavLink to='/home' className={'flex'}>
                            <Typography variant="h5" component="h5" alignSelf={"center"} sx={{ color: "#000000" }} >
                                OnlineDiary
                            </Typography>
                        </NavLink>
                    </Stack>

                    <Stack direction="row" spacing={5} alignSelf={"center"} justifyContent={"center"} sx={{ width: "30%" }} >
                        <HomeButton />
                        <BooksButton />
                        <ProfileButton />
                    </Stack>

                    <Stack direction="row" spacing={5} sx={{ width: "35%" }} alignSelf={"center"} alignItems={"center"} justifyContent={"flex-end"}>
                        <Typography variant="h6" component="div" sx={{ color: "#000000" }}>{given_name.split(' ')[0]}</Typography>
                        <Avatar alt='User Profile Picture' src={picture} />
                        <AuthNav />
                    </Stack>

                </Stack>
            </AppBar>
        );
    }

};


export default Navbar;