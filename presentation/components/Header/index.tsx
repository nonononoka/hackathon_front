import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Dispatch, SetStateAction } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { fireAuth } from '@/lib/auth/firebase';
import { UserConfigurationModal } from './UserConfigurationModal';
import { useModal } from './UserConfigurationModal/hooks';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export const Header = ({ isSidebarOpen, setIsSidebarOpen }: { isSidebarOpen: boolean, setIsSidebarOpen: Dispatch<SetStateAction<boolean>> }) => {
    const { isOpenModal, setOpenModal } = useModal()

    return (
        <>
            <AppBar position="fixed" open={isSidebarOpen}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsSidebarOpen(true)}
                        edge="start"
                        sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Tech Tweet
                    </Typography>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        onClick = {() => setOpenModal(true)}
                    >
                        <AccountCircle />
                    </IconButton>
                    <button onClick={() => fireAuth.signOut()}>signOut</button>
                </Toolbar>
            </AppBar>
            <UserConfigurationModal isOpenModal={isOpenModal} handleClose={() => setOpenModal(false)}/>
        </>
    )
}