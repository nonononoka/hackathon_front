import { UserResponse } from "@/types/apiUser"

type FollowUsers = {
    followingUsers: UserResponse[] | undefined
}

export const FollowingUsers = (props: FollowUsers) => {
    const {followingUsers} = props

    return (
        <>
            {followingUsers?.map((user) => <button key={user.id}>{user.name}</button>)}
        </>
    )
}