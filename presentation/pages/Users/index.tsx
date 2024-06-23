import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useUsers } from '@/useCase/query/useUsers';
import { useMeFollowedUsers, useMeFollowingUsers } from '@/useCase/query/userelationship';
import { useAuthToken } from '@/useCase/query/useAuthToken';
import { UserList } from '@/presentation/components/UserList';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export const Users = () => {
    const theme = useTheme();
    const { data: token } = useAuthToken()
    const { data: allUsers, mutate: allUsersMutate } = useUsers(token)
    const { data: followingUsers, mutate: followingUsersMutate } = useMeFollowingUsers(token)
    const { data: followedUsers, mutate: followedUsersMutate } = useMeFollowedUsers(token)
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <AppBar position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="All Users" {...a11yProps(0)} />
                    <Tab label="Following" {...a11yProps(1)} />
                    <Tab label="Followers" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <UserList users={allUsers} allUsersMutate={allUsersMutate} followingUsersMutate={followingUsersMutate} followedUsersMutate={followedUsersMutate} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <UserList users={followingUsers} allUsersMutate={allUsersMutate} followingUsersMutate={followingUsersMutate} followedUsersMutate={followedUsersMutate}/>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <UserList users={followedUsers} allUsersMutate={allUsersMutate} followingUsersMutate={followingUsersMutate} followedUsersMutate={followedUsersMutate}/>
            </TabPanel>
        </>
    )
}