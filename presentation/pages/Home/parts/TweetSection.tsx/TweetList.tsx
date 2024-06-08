import { TweetResponse } from "@/types/apiTweet";

type Tweets = {
  tweets: TweetResponse[]
}
export const TweetList = (props: Tweets) => {
  const tweets = props.tweets;

  return (
    <>
      {tweets.map((tweet) => <p key={tweet.id}>{tweet.body}, {tweet.postedAt}, {tweet.postedBy}, {tweet.likeCount} , {tweet.tags}</p>)}
    </>
  )
}