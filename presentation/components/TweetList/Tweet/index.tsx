import { useTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useCreateFavorite } from "@/useCase/command/createFavorite"
import { useDeleteFavorite } from "@/useCase/command/deleteFavorite"
import Link from 'next/link'
import { useState } from "react"
import React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { ReplyModal } from "../ReplyModal"
import { useModal } from "../ReplyModal/hooks"
import { useRouter } from "next/navigation"
import { KeyedMutator } from "swr";
import { TweetResponse } from "@/types/apiTweet";
import { useEffect } from "react"

type EachTweetProps = {
    id: string,
    body: string,
    postedAt: string,
    postedBy: string,
    postedByName: string,
    likeCount: number,
    replyCount: number,
    tags: string[],
    isFaved: boolean,
    allTweetsMutate: KeyedMutator<TweetResponse[]> | null
    followingTweetsMutate: KeyedMutator<TweetResponse[]> | null
}

export const EachTweet = (props: EachTweetProps) => {
    const router = useRouter()
    const { isOpenModal, setOpenModal } = useModal()
    // const { data: token } = useAuthToken()
    const { id, body, postedAt, postedByName, likeCount, replyCount, tags, isFaved, allTweetsMutate, followingTweetsMutate } = props
    const [tweet, setTweet] = useState({ id, body, postedAt, postedByName, likeCount, tags, isFaved, replyCount })
    // const { data, trigger, error } = useTweets(token, tweet.id)
    const { createFavorite } = useCreateFavorite(tweet.id)
    const { deleteFavorite } = useDeleteFavorite(tweet.id)

    useEffect(() => {
        setTweet({ id, body, postedAt, postedByName, likeCount, tags, isFaved, replyCount })
    }, [id, body, postedAt, postedByName, likeCount, tags, isFaved, replyCount])

    const handleFav = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!tweet.isFaved) {
            createFavorite()
                .then(() => setTweet({ ...tweet, isFaved: !tweet.isFaved, likeCount: tweet.likeCount += 1 }))
                .catch((e) => console.log(e))
                .then(() => {
                    if (allTweetsMutate) {
                        allTweetsMutate()
                    }
                })
                .then(() => {
                    if (followingTweetsMutate) {
                        followingTweetsMutate()
                    }
                })
        }
        else {
            deleteFavorite()
                .then(() => setTweet({ ...tweet, isFaved: !tweet.isFaved, likeCount: tweet.likeCount -= 1 }))
                .catch((e) => console.log(e))
                .then(() => {
                    if (allTweetsMutate) {
                        allTweetsMutate()
                    }
                })
                .then(() => {
                    if (followingTweetsMutate) {
                        followingTweetsMutate()
                    }
                })
        }
    }
    return (
        <>
            <Card variant="outlined" onClick={() => router.push(`/tweet/${tweet.id}`)}>
                <CardHeader
                    // avatar={<Avatar src={user.profileImageUrl} alt={user.name} />}
                    title={tweet.postedByName}
                    subheader={`@${tweet.postedByName} • ${tweet.postedAt}`}
                />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        {tweet.body}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions disableSpacing>
                    <IconButton aria-label="like" onClick={handleFav}>
                        {tweet.isFaved ? <FavoriteIcon style={{ color: '#E0245E' }} /> : <FavoriteIcon />}
                        <Typography variant="body2">{tweet.likeCount}</Typography>
                    </IconButton>
                    <IconButton aria-label="comment" onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setOpenModal(true)
                    }}>
                        <ChatBubbleOutlineIcon />
                        <Typography variant="body2">{tweet.replyCount}</Typography>
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
            <ReplyModal tweetID={tweet.id} isOpenModal={isOpenModal} handleClose={() => setOpenModal(false)} allTweetsMutate={allTweetsMutate} followingTweetsMutate={followingTweetsMutate} />
        </>
    );
}