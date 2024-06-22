import { useUsers } from "@/useCase/query/useUsers"
import { useAuthToken } from "@/useCase/query/useAuthToken"
// import { useFollowUser } from "@/useCase/command/followUser"
import { AllUsers } from "./AllUsers"
import { FollowingUsers } from "./FollowingUsers"
import { UserResponse } from "@/types/apiUser"
import { useState } from "react"
import { useFollowingUsers } from "@/useCase/query/useFollowingUsers"
import { KeyedMutator } from "swr"
import { TweetResponse } from "@/types/apiTweet"

type UsersSectionPropsType = {
    followingTweetsMutate: KeyedMutator<TweetResponse[]>
}

export const UsersSection = (props: UsersSectionPropsType) => {
    const { followingTweetsMutate } = props
    const { data: token } = useAuthToken()
    const { data: allUsers, isLoading, error } = useUsers(token)
    const { data: followingUsers, error: followingUsersError, isLoading: followingUsersLoading, mutate: followingUsersMutate } = useFollowingUsers(token)

    if (isLoading || error || followingUsersError || followingUsersLoading) {
        return <p>isLoading</p>
    }

    return (
        <>
            <h1>all users</h1>
            <AllUsers allUsers={allUsers} followingUsersMutate={followingUsersMutate} followingTweetsMutate={followingTweetsMutate} />
            <h1>following users</h1>
            <FollowingUsers followingUsers={followingUsers} />
        </>
    )
}