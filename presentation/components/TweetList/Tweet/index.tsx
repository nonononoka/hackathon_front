import { useTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useCreateFavorite } from "@/useCase/command/createFavorite"
import { useDeleteFavorite } from "@/useCase/command/deleteFavorite"
import { useState } from "react"
import React from 'react';
import { Avatar, Card, CardHeader, CardContent, CardActions, IconButton, Typography, Divider, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RepeatIcon from '@mui/icons-material/Repeat';
import ReplyIcon from '@mui/icons-material/Reply';
import ShareIcon from '@mui/icons-material/Share';
import { ReplyModal } from "../ReplyModal"
import { useModal } from "../ReplyModal/hooks"
import { useRouter } from "next/navigation"
import { KeyedMutator } from "swr";
import { TweetResponse } from "@/types/apiTweet";
import { useEffect } from "react"
import { useTweetContext } from "@/useCase/context/TweetContext"

type EachTweetProps = {
    id: string,
    body: string,
    postedAt: string,
    postedBy: string,
    postedByName: string,
    postedByImage: { String: string, Valid: boolean }
    likeCount: number,
    replyCount: number,
    tags: string[],
    isFaved: boolean,
    otherMutates?: KeyedMutator<TweetResponse[]>[]
    replyTo: {
        String: string;
        Valid: boolean;
    };
}

export const EachTweet = (props: EachTweetProps) => {
    const router = useRouter()
    const { isOpenModal, setOpenModal } = useModal()
    const { id, body, postedAt, postedBy, postedByName, postedByImage, likeCount, replyCount, tags, isFaved, otherMutates, replyTo } = props
    const [tweet, setTweet] = useState({ id, body, postedAt, postedBy, postedByName, postedByImage, likeCount, tags, isFaved, replyCount, replyTo })
    const { createFavorite } = useCreateFavorite(tweet.id)
    const { deleteFavorite } = useDeleteFavorite(tweet.id)
    let { allTweets: { mutate: allTweetsMutate }, followingTweets: { mutate: followingTweetsMutate } } = useTweetContext()

    useEffect(() => {
        setTweet({ id, body, postedAt, postedBy, postedByName, postedByImage, likeCount, tags, isFaved, replyCount, replyTo })
    }, [id, body, postedAt, postedBy, postedByName, postedByImage, likeCount, tags, isFaved, replyCount])

    const handleFav = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!tweet.isFaved) {
            createFavorite()
                .then(() => setTweet({ ...tweet, isFaved: !tweet.isFaved, likeCount: tweet.likeCount += 1 }))
                .then(() => {
                    const promises = [allTweetsMutate(), followingTweetsMutate()]
                    if (otherMutates) {
                        otherMutates.forEach((mutate) => promises.push(mutate()))
                    }
                    return Promise.all([promises])
                })
                .catch((e) => console.log(e))
        }
        else {
            deleteFavorite()
                .then(() => setTweet({ ...tweet, isFaved: !tweet.isFaved, likeCount: tweet.likeCount -= 1 }))
                .then(() => {
                    if (allTweetsMutate) {
                        allTweetsMutate()
                    }
                })
                .then(() => {
                    const promises = [allTweetsMutate(), followingTweetsMutate()]
                    if (otherMutates) {
                        otherMutates.forEach((mutate) => promises.push(mutate()))
                    }
                    return Promise.all([promises])
                })
                .catch((e) => console.log(e))
        }
    }
    return (
        <>
            <Card sx={{
                border: 'none' ,
                borderBottom: '2px solid #e0e0e0',
                marginRight: tweet.replyTo.Valid ? 'auto': undefined, // 右側に寄せる
                marginLeft: tweet.replyTo.Valid ? 16: undefined,
                transition: 'background-color 0.3s ease', // 背景色のトランジション設定
                '&:hover': {
                    cursor: 'pointer', // ホバー時のカーソル形状の指定
                    backgroundColor: '#f0f0f0', // ホバー時の背景色
                },
            }} variant="outlined" onClick={() => router.push(`/tweet/${tweet.id}`)}>
                <CardHeader
                    avatar={<Avatar sx={{
                        transition: 'transform 0.3s ease-in-out', // トランジションの設定
                        '&:hover': {
                            transform: 'scale(1.1)', // ホバー時の拡大
                            cursor: 'pointer', // ホバー時のカーソル形状の指定
                        },
                    }} src={tweet.postedByImage.String} alt={tweet.postedByName} onClick={(e: React.MouseEvent) => { e.stopPropagation(); router.push(`/users/${tweet.postedBy}`) }} />}
                    title={tweet.postedByName}
                    subheader={`@${tweet.postedByName} • ${tweet.postedAt}`}
                />
                <CardContent>
                    <Typography variant="body1" gutterBottom>
                        {tweet.body}
                    </Typography>
                </CardContent>
                {tweet.tags && (
                    <CardContent>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                            {tweet.tags.map((tag, index) => (
                                <Chip key={index} label={tag} color="primary" variant="outlined" />
                            ))}
                        </div>
                    </CardContent>
                )}
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
                        <ReplyIcon />
                        <Typography variant="body2">{tweet.replyCount}</Typography>
                    </IconButton>
                </CardActions>
            </Card>
            <ReplyModal tweetID={tweet.id} isOpenModal={isOpenModal} handleClose={() => setOpenModal(false)} otherMutates={otherMutates} />
        </>
    );
}