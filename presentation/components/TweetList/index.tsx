import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "@/presentation/components/Tweet";

type Tweets = {
    tweets: TweetResponse[] | undefined
}
export const TweetList = (props: Tweets) => {
    const { tweets } = props
    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} />)}
        </>
    )
}