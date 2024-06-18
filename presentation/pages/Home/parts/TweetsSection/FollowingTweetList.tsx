import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./EachTweet";

type Tweets = {
    tweets: TweetResponse[] | undefined
}
export const FollowingTweetList = (props: Tweets) => {
    const { tweets } = props
    return (
        <>
            <h1>followしてるuserのツイート</h1>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} />)}
        </>
    )
}