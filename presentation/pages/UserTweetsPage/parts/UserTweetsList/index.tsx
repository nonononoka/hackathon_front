import { TweetResponse } from "@/types/apiTweet";
import { EachTweet } from "./Tweet";
import { KeyedMutator } from "swr";

type Tweets = {
    tweets: TweetResponse[] | undefined
    mutate: KeyedMutator<TweetResponse[]>
}
export const UserTweetsList = (props: Tweets) => {
    let { tweets, mutate } = props
    tweets = tweets?.filter((tweet) => !tweet.replyTo.Valid)
    tweets?.sort((a, b) => {
      if (a.postedAt > b.postedAt) {
        return -1;
      } else if (a.postedAt < b.postedAt) {
        return 1;
      } else {
        return 0;
      }
    });

    return (
        <>
            {tweets?.map((tweet) => <EachTweet key={tweet.id} {...tweet} otherMutate={mutate} />)}
        </>
    )
}