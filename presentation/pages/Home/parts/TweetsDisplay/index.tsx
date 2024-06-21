import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { TweetList } from '@/presentation/components/TweetList';
import { TweetResponse } from '@/types/apiTweet';
import { KeyedMutator } from 'swr';

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

type HomeTweetsProps = {
    allTweets: TweetResponse[] | undefined,
    followingTweets : TweetResponse[] | undefined,
    allTweetsMutate: KeyedMutator<TweetResponse[]>,
    followingTweetsMutate: KeyedMutator<TweetResponse[]>
}

export const HomeTweets = ({ allTweets, followingTweets, allTweetsMutate, followingTweetsMutate }: HomeTweetsProps) => {
    const theme = useTheme();
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
                    <Tab label="All Tweets" {...a11yProps(0)} />
                    <Tab label="Following Tweets" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <TweetList tweets={allTweets} tweetsMutate={allTweetsMutate} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <TweetList tweets={followingTweets} tweetsMutate={followingTweetsMutate}/>
            </TabPanel>
        </>
    )
}
