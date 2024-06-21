import { TweetResponse } from "@/types/apiTweet"
import { TweetList } from "@/presentation/components/TweetList"
import { KeyedMutator } from "swr"

export const EachTweet = ({ curTweetID, threadTweets, threadTweetsMutate }: { curTweetID: string, threadTweets: TweetResponse[] | undefined , threadTweetsMutate: KeyedMutator<TweetResponse[]>}) => {
    if (!threadTweets) {
        return <p>loading</p>
    }

    return (
        <TweetList tweets= {threadTweets} tweetsMutate={threadTweetsMutate}/>
    )
}