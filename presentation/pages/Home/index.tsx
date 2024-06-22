import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useState } from "react"
import { TweetForm } from "@/presentation/components/TweetForm"
import { useCreateTweet } from "@/useCase/command/createTweet";
import * as React from 'react';
import Box from '@mui/material/Box';
import { drawerWidth } from '@/presentation/components/SideBar';
import { AllAndFollowingTweets } from "../../components/AllAndFollowingTweets"
import { useTweetContext } from "@/useCase/context/TweetContext"

export type FormType = {
  tweet: string;
  tags?: string[];
}

export const Home = () => {
  // tweetを送ったりgetしたり
  const { data: token } = useAuthToken()
  let { allTweets: { tweets: allTweets, mutate: allTweetsMutate }, followingTweets: { tweets: followingTweets, mutate: followingTweetsMutate } } = useTweetContext()
  console.log(token)
  const { createTweetTrigger } = useCreateTweet()
  allTweets = allTweets?.filter((tweet) => !tweet.replyTo.Valid)
  followingTweets = followingTweets?.filter((tweet) => !tweet.replyTo.Valid)
  allTweets?.sort((a, b) => {
    if (a.postedAt > b.postedAt) {
      return -1;
    } else if (a.postedAt < b.postedAt) {
      return 1;
    } else {
      return 0;
    }
  });
  followingTweets?.sort((a, b) => {
    if (a.postedAt > b.postedAt) {
      return -1;
    } else if (a.postedAt < b.postedAt) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <Box sx={{ width: `calc(100vw - ${drawerWidth})`, bgcolor: 'background.paper' }}>
      <TweetForm createTweetTrigger={createTweetTrigger} />
      <AllAndFollowingTweets allTweets={allTweets} followingTweets={followingTweets} />
    </Box>
  );
}