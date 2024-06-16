import { TweetResponse } from "@/types/apiTweet";

type Tweets = {
    tweets: TweetResponse[] | undefined
}
export const FollowingTweetList = (props: Tweets) => {
    const { tweets } = props
    return (
        <>
        <h1>followしてるuserのツイート</h1>
            {tweets?.map((tweet) => <p key={tweet.id}>{tweet.body}, {tweet.postedAt}, {tweet.postedBy}, {tweet.likeCount} , {tweet.tags}</p>)}
        </>
    )
}