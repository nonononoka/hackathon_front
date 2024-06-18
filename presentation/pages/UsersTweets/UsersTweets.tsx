import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "../Home/parts/TweetsSection/EachTweet";

type Tweets = {
    tweets: TweetResponse[] | undefined
}

export const UsersTweets = (props: Tweets) => {
    const { tweets } = props
    return (
        <>
            <h1>userのツイート</h1>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} />)}
        </>
    )
}
