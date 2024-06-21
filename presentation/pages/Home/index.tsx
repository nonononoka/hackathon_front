import { useFollowingTweets } from "@/useCase/query/useFollowingTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useTaggedTweets } from "@/useCase/query/useTweets"
import { TagForm } from "./parts/TweetForm/TagForm"
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
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  let { data: followingTweets, mutate: followingTweetsMutate } = useFollowingTweets(token)
  let { data: allTweets, mutate: allTweetsMutate, isLoading } = useTaggedTweets(token, selectedTags)
  const { createTweetTrigger } = useCreateTweet()
  allTweets = allTweets?.filter((tweet) => !tweet.replyTo.Valid)
  followingTweets = followingTweets?.filter((tweet) => !tweet.replyTo.Valid)
  allTweets?.sort((a, b) => {
    // a と b の postedAt を比較して、降順に並べ替える
    if (a.postedAt > b.postedAt) {
        return -1; // a の postedAt が b より大きい場合、a を b より前にする
    } else if (a.postedAt < b.postedAt) {
        return 1; // a の postedAt が b より小さい場合、a を b より後ろにする
    } else {
        return 0; // postedAt が同じ場合は順序を変えない
    }
});
  followingTweets?.sort((a, b) => {
    // a と b の postedAt を比較して、降順に並べ替える
    if (a.postedAt > b.postedAt) {
        return -1; // a の postedAt が b より大きい場合、a を b より前にする
    } else if (a.postedAt < b.postedAt) {
        return 1; // a の postedAt が b より小さい場合、a を b より後ろにする
    } else {
        return 0; // postedAt が同じ場合は順序を変えない
    }
});

  if (isLoading || !allTweets) {
    return <div>Loading</div>
  }

  return (
    <Box sx={{ width: `calc(100vw - ${drawerWidth})`, bgcolor: 'background.paper' }}>
      <TweetForm createTweetTrigger={createTweetTrigger} tweetsMutate={allTweetsMutate} handleClose = {null}/>
      <TagForm setSelectedTags={setSelectedTags} />
      <HomeTweets allTweets={allTweets} followingTweets={followingTweets} allTweetsMutate = {allTweetsMutate} followingTweetsMutate= {followingTweetsMutate}/>
    </Box>

  );
}