import { UserResponse } from "@/types/apiUser"
import { KeyedMutator } from "swr"
import { TweetResponse } from "@/types/apiTweet"

type FollowUsers = {
    followingUsers: UserResponse[] | undefined
    followingTweetsMutate :  KeyedMutator<TweetResponse[]>
}

export const FollowingUsers = (props: FollowUsers) => {
    const {followingUsers} = props

    return (
        <>
            {followingUsers?.map((user) => <button key={user.id}>{user.name}</button>)}
        </>
    )
}