import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
    mutates?: KeyedMutator<TweetResponse[]>[]
}
export const TweetList = (props: Tweets) => {
    const { tweets, mutates } = props

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} otherMutates={mutates} />)}
        </>
    )
}