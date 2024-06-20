import { useFollowingTweets } from "@/useCase/query/useFollowingTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { TweetList } from "@/presentation/components/TweetList"
import { useTaggedTweets } from "@/useCase/query/useTweets"
import { TagForm } from "./parts/TweetsSection/TagForm"
import { useState } from "react"
import { TweetForm } from "./parts/TweetsSection/TweetForm"
import { useCreateTweet } from "@/useCase/command/createTweet";
import { useForm, SubmitHandler } from "react-hook-form";
// export const Home = () => {
//   const { data: token } = useAuthToken()
//   const {data: followingTweets, error, isLoading, mutate} = useFollowingTweets(token)

//   return (
//     <>
//       <TweetsSection followingTweets = {followingTweets}/>
//       <UsersSection followingTweetsMutate = {mutate}/>
//     </>
//   )
// }

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { drawerWidth } from '@/presentation/components/SideBar';

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

export type FormType = {
  tweet: string;
  tags?: string[];
}

export const Home = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data: token } = useAuthToken()
  const { data: followingTweets, mutate: followingTweetsMutate } = useFollowingTweets(token)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { data: allTweets, mutate: allTweetsMutate, isLoading} = useTaggedTweets(token, selectedTags)
  const { createTweetTrigger } = useCreateTweet()
  const { register, handleSubmit, reset } = useForm<FormType>()
  const onSubmit: SubmitHandler<FormType> = (data) => {
    createTweetTrigger({ data: { body: data.tweet, tags: data.tags ? [...data.tags] : [] } })
      .then(() => allTweetsMutate())
      .then(() => {
        reset()
      })
  }

  if (isLoading || !allTweets) {
    return <div>Loading</div>
  }

  return (
    <Box sx={{ width: `calc(100vw - ${drawerWidth})`, bgcolor: 'background.paper' }}>
      <TweetForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} />
      <TagForm setSelectedTags={setSelectedTags} />
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
        <TweetList tweets={allTweets} />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <TweetList tweets={followingTweets} />
      </TabPanel>
    </Box>

  );
}