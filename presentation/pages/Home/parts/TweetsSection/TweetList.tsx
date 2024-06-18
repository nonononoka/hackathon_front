import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./EachTweet";

type Tweets = {
  tweets: TweetResponse[]
}

export const TweetList = (props: Tweets) => {
  const tweets = props.tweets;

  return (
    <>
      {tweets.map((tweet) =>
        <EachTweet key={tweet.id} {...tweet} />
      )}
    </>
  )
}
