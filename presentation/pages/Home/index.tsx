import { useFollowingTweets } from "@/useCase/query/useFollowingTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useTaggedTweets } from "@/useCase/query/useTweets"
import { useState } from "react"
import { TweetForm } from "@/presentation/components/TweetForm"
import { useCreateTweet } from "@/useCase/command/createTweet";
import * as React from 'react';
import Box from '@mui/material/Box';
import { drawerWidth } from '@/presentation/components/SideBar';
import { HomeTweets } from "./parts/TweetsDisplay"

export type FormType = {
  tweet: string;
  tags?: string[];
}

export const Home = () => {
  // tweetを送ったりgetしたり
  const { data: token } = useAuthToken()
  console.log(token)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  let { data: followingTweets, mutate: followingTweetsMutate } = useFollowingTweets(token)
  let { data: allTweets, mutate: allTweetsMutate, isLoading } = useTaggedTweets(token, selectedTags)
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

  if (isLoading || !allTweets) {
    return <div>Loading</div>
  }

  return (
    <Box sx={{ width: `calc(100vw - ${drawerWidth})`, bgcolor: 'background.paper' }}>
      <TweetForm createTweetTrigger={createTweetTrigger} allTweetsMutate={allTweetsMutate} followingTweetsMutate={followingTweetsMutate} handleClose={null} />
      {/* <TagForm setSelectedTags={setSelectedTags} /> */}
      <HomeTweets allTweets={allTweets} followingTweets={followingTweets} allTweetsMutate={allTweetsMutate} followingTweetsMutate={followingTweetsMutate} />
    </Box>

  );
}