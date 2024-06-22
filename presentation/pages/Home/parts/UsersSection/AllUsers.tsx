import { UserResponse } from "@/types/apiUser"
import { KeyedMutator } from "swr"
import { useFollowUser } from "@/useCase/command/followUser"
import { useEffect, useState, useContext } from "react"
import { MeContext } from "@/presentation/routing/MeRouteGuard"
import { TweetResponse } from "@/types/apiTweet"

type AllUsersProps = {
    allUsers: UserResponse[] | undefined
    followingUsersMutate: KeyedMutator<UserResponse[]>
    followingTweetsMutate: KeyedMutator<TweetResponse[]>
}

export const AllUsers = (props: AllUsersProps) => {
    const { id } = useContext(MeContext)
    const { allUsers, followingUsersMutate, followingTweetsMutate } = props
    const [followingUserID, setFollowingUserID] = useState<string | null>(null)
    const { followUser } = useFollowUser(followingUserID)
    const handleFollow = (followingUserID: string) => {
        setFollowingUserID(followingUserID)
    }

    useEffect(() => {
        if (!!followingUserID) {
            followUser().then(() => followingUsersMutate())
                .then(() => followingTweetsMutate())
                .catch((e) => alert(e))
        }
    }, [followingUserID])

    return (
        <>
            {allUsers?.filter((user) => user.id != id).map((user) => <button key={user.id} onClick={() => handleFollow(user.id)}>{user.name}</button>)}
        </>
    )
}