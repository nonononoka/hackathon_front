import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
    allTweetsMutate: KeyedMutator<TweetResponse[]> | null
    followingTweetsMutate: KeyedMutator<TweetResponse[]> | null
}
export const TweetList = (props: Tweets) => {
    const { tweets, allTweetsMutate, followingTweetsMutate } = props

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} allTweetsMutate={allTweetsMutate} followingTweetsMutate={followingTweetsMutate}/>)}
        </>
    )
}