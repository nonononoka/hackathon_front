import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
    mutate: KeyedMutator<TweetResponse[]>
}
export const ThreadTweetList = (props: Tweets) => {
    const { tweets, mutate } = props

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} otherMutate={mutate} />)}
        </>
    )
}