import { useTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useCreateFavorite } from "@/useCase/command/createFavorite"
import { useDeleteFavorite } from "@/useCase/command/DeleteFavorite"
import Link from 'next/link'
import { useState } from "react"
import React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

type EachTweetProps = {
    id: string,
    body: string,
    postedAt: string,
    postedBy: string,
    postedByName: string,
    likeCount: number,
    tags: string[],
    isFaved: boolean
}

export const EachTweet = (props: EachTweetProps) => {
    const { data: token } = useAuthToken()
    const [tweet, setTweet] = useState(props)
    const { id, body, postedAt, postedByName, likeCount, tags, isFaved } = tweet
    const { createFavorite } = useCreateFavorite(tweet.id)
    const { deleteFavorite } = useDeleteFavorite(tweet.id)
    const { data, isLoading, mutate, error } = useTweets(token, tweet.id)
    const handleFav = () => {
        if (!isFaved) {
            createFavorite()
                .then(() => mutate())
                .catch((e) => console.log(e))
                .then((data) => { if (!!data) setTweet(data[0]) })
        }
        else {
            deleteFavorite()
                .then(() => mutate())
                .catch((e) => console.log(e))
                .then((data) => { if (!!data) setTweet(data[0]) })
        }
    }
    return (
        <Card variant="outlined">
            <CardHeader
                // avatar={<Avatar src={user.profileImageUrl} alt={user.name} />}
                title={postedByName}
                subheader={`@${postedByName} • ${postedAt}`}
            />
            <CardContent>
                <Typography variant="body1" gutterBottom>
                    {body}
                </Typography>
            </CardContent>
            <Divider />
            <CardActions disableSpacing>
                <IconButton aria-label="like" onClick={handleFav}>
                    {isFaved ? <FavoriteIcon style={{ color: '#E0245E' }} /> : <FavoriteIcon />}
                    <Typography variant="body2">{likeCount}</Typography>
                </IconButton>
                {/* <IconButton aria-label="retweet">
                    <RepeatIcon />
                    <Typography variant="body2">{retweets}</Typography>
                </IconButton>
                <IconButton aria-label="comment">
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton> */}
            </CardActions>
        </Card>
    );
}