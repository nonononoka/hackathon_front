import { UserResponse } from "@/types/apiUser"
import { EachUser } from "./User"
import { List } from "@mui/material"
import { KeyedMutator } from "swr"

type Users = {
    users: UserResponse[] | undefined
    followingUsersMutate: KeyedMutator<UserResponse[]>
    allUsersMutate: KeyedMutator<UserResponse[]>
}

export const UserList = (props: Users) => {
    const { users, followingUsersMutate, allUsersMutate } = props
    return (
        <List>
            {users?.map((user) => <EachUser key={user.id} {...user} allUsersMutate = {allUsersMutate} followingUsersMutate={followingUsersMutate}/>)}
        </List>
    )
}