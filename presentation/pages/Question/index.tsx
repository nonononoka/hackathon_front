import { useFollowingTweets } from "@/useCase/query/useFollowingTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useTaggedTweets } from "@/useCase/query/useTweets"
import { useState } from "react"
import * as React from 'react';
import Box from '@mui/material/Box';
import { drawerWidth } from '@/presentation/components/SideBar';
import { AllAndFollowingTweets } from "../../components/AllAndFollowingTweets"

export type FormType = {
    tweet: string;
    tags?: string[];
}

export const Question = () => {
    const { data: token } = useAuthToken()
    const tags = ["question"]
    let { data: allTaggedTweets, mutate: allTaggedTweetsMutate } = useTaggedTweets(token, tags)
    let { data: followingTaggedTweets, mutate: followingTaggedTweetsMutate } = useFollowingTweets(token, tags)
    console.log(allTaggedTweets, followingTaggedTweets)
    allTaggedTweets = allTaggedTweets?.filter((tweet) => !tweet.replyTo.Valid)
    followingTaggedTweets = followingTaggedTweets?.filter((tweet) => !tweet.replyTo.Valid)
    allTaggedTweets?.sort((a, b) => {
        if (a.postedAt > b.postedAt) {
            return -1;
        } else if (a.postedAt < b.postedAt) {
            return 1;
        } else {
            return 0;
        }
    });
    followingTaggedTweets?.sort((a, b) => {
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
            <AllAndFollowingTweets allTweets={allTaggedTweets} followingTweets={followingTaggedTweets} mutates = {[allTaggedTweetsMutate, followingTaggedTweetsMutate]}/>
        </Box>
    );
}