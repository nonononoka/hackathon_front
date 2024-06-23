import { useAuthToken } from "@/useCase/query/useAuthToken"
import { TweetList } from "@/presentation/components/TweetList"
import { useThreadTweets } from "@/useCase/query/useThreadTweets"
import { Loading } from "@/presentation/components/Loading"

export const EachTweetPage = ({ tweetID }: { tweetID: string }) => {
    const { data: token } = useAuthToken()
    const { data, isLoading, mutate, error } = useThreadTweets(token, tweetID)
    if (isLoading) {
        return <Loading />
    }

    data?.sort((a, b) => {
        if (a.postedAt < b.postedAt) {
            return -1;
        } else if (a.postedAt > b.postedAt) {
            return 1;
        } else {
            return 0;
        }
    });

    return (
        <>
            <TweetList tweets={data} mutates={[mutate]} />
        </>
    )
}