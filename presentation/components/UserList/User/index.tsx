import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Button, Chip, Divider } from "@mui/material"
import { useFollowUser } from "@/useCase/command/followUser"
import { useUnfollowUser } from "@/useCase/command/unfollowUser"
import { KeyedMutator } from "swr"
import { UserResponse } from "@/types/apiUser"
import { useState } from "react"
import { useTweetContext } from "@/useCase/context/TweetContext"

type UserProps = {
    id: string,
    bio: { String: string, Valid: boolean };
    name: string,
    email: string,
    isFollowing?: boolean,
    isFollowed?: boolean,
    image: { String: string, Valid: boolean }
    followingUsersMutate: KeyedMutator<UserResponse[]>
    followedUsersMutate: KeyedMutator<UserResponse[]>
    allUsersMutate: KeyedMutator<UserResponse[]>
}

export const EachUser = (props: UserProps) => {
    console.log(props)
    const { id, email, name, image, isFollowing, bio, isFollowed, followingUsersMutate, allUsersMutate, followedUsersMutate } = props
    const [user, setUser] = useState({ id, email, bio, name, image, isFollowing, isFollowed })
    const { followUser } = useFollowUser(id)
    const { unfollowUser } = useUnfollowUser(id)
    const { followingTweets: { mutate: followingTweetsMutate } } = useTweetContext()
    const handleFollowClick = () => {
        if (!user.isFollowing) {
            followUser()
                .then(() => { setUser({ ...user, isFollowing: true }) })
                .then(() => {
                    const promises = [allUsersMutate(), followingUsersMutate(), followingTweetsMutate(), followedUsersMutate()]
                    return Promise.all([promises])
                })
                .catch((e) => console.error(e))
        }
        else {
            unfollowUser()
                .then(() => setUser({ ...user, isFollowing: false }))
                .then(() => {
                    const promises = [allUsersMutate(), followingUsersMutate(), followingTweetsMutate(), followedUsersMutate()]
                    return Promise.all([promises])
                })
                .catch((e) => console.error(e))
        }
    };

    return (
        <>
            <ListItem key={user.id} disablePadding>
                <ListItemAvatar>
                    <Avatar alt={user.name} src={user.image.String} />
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={user.bio.String}
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