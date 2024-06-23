import { useUserTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { TweetList } from "@/presentation/components/TweetList"
import { Loading } from "@/presentation/components/Loading"
import { useFollowedUsers, useFollowingUsers } from "@/useCase/query/useRelationship"

export const UserTweetsPage = ({ userID }: { userID: string }) => {
    const { data: token } = useAuthToken()
    // const { data: followedUsers, mutate: followedUsersMutate } = useFollowedUsers(token, userID)
    // const { data: followingUsers, mutate: followingUsersMutate } = useFollowedUsers(token, userID)
    const { data, isLoading, mutate, error } = useUserTweets(token, userID)
    if (isLoading) {
        return <Loading />
    }

    data?.sort((a, b) => {
        // a と b の postedAt を比較して、降順に並べ替える
        if (a.postedAt < b.postedAt) {
            return -1; // a の postedAt が b より大きい場合、a を b より前にする
        } else if (a.postedAt > b.postedAt) {
            return 1; // a の postedAt が b より小さい場合、a を b より後ろにする
        } else {
            return 0; // postedAt が同じ場合は順序を変えない
        }
    });

    return (
        <>
            <TweetList tweets={data} mutates={[mutate]} />
        </>
    )
}