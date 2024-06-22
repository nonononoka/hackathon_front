import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
}
export const TweetList = (props: Tweets) => {
    const { tweets} = props

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet}/>)}
        </>
    )
}