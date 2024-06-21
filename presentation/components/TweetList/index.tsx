import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
    tweetsMutate: KeyedMutator<TweetResponse[]> | null
}
export const TweetList = (props: Tweets) => {
    const { tweets, tweetsMutate } = props
    console.log("TweetList", tweets)

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} tweetsMutate={tweetsMutate}/>)}
        </>
    )
}