import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Button, Chip, Divider } from "@mui/material"
import { useFollowUser } from "@/useCase/command/followUser"
import { useUnfollowUser } from "@/useCase/command/unfollowUser"
import { KeyedMutator } from "swr"
import { UserResponse } from "@/types/apiUser"
import { useState } from "react"

type UserProps = {
    id: string,
    name: string,
    email: string,
    isFollowing: boolean,
    isFollowed: boolean,
    followingUsersMutate: KeyedMutator<UserResponse[]>
    allUsersMutate: KeyedMutator<UserResponse[]>
}

export const EachUser = (props: UserProps) => {
    console.log(props)
    const { id, email, name, isFollowing, isFollowed, followingUsersMutate, allUsersMutate } = props
    const [user, setUser] = useState({ id, email, name, isFollowing, isFollowed })
    const { followUser } = useFollowUser(id)
    const { unfollowUser } = useUnfollowUser(id)
    const handleFollowClick = () => {
        if (!user.isFollowing) {
            followUser()
                .then(() => {
                    setUser({ ...user, isFollowing: true })
                    console.log("followしたよ")
                })
                .then(() => allUsersMutate())
                .then(() => followingUsersMutate())
                .then(() => console.log("follow done!"))
        }
        else {
            unfollowUser()
                .then(() => setUser({ ...user, isFollowing: false }))
                .then(() => allUsersMutate())
                .then(() => followingUsersMutate())
        }
    };
    const tags = ["go", "html", "css"]
    // console.log(user)

    return (
        <>
            <ListItem key={user.id} disablePadding>
                <ListItemAvatar>
                    <Avatar alt={user.name} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={
                        <>
                            {tags.map((tag, index) => (
                                <Chip key={index} label={tag} style={{ marginRight: 15 }} />
                            ))}
                        </>
                    }
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleFollowClick()}
                    sx={{ borderRadius: 9999 }} // ここで丸みを指定
                >
                    {user.isFollowing ? "Unfollow" : "Follow"}
                </Button>
            </ListItem>
        </>
    )
}