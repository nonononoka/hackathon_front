import { TriggerWithOptionsArgs } from "swr/mutation";
import { TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";
import { Key } from "swr";
import { TweetPostRequest } from "@/types/apiTweet";
import { KeyedMutator } from "swr";
import { MuiChipsInput } from "mui-chips-input";
import { useTweetContext } from "@/useCase/context/TweetContext";
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { resolve } from "path";

type TweetFormProps = {
    createTweetTrigger: TriggerWithOptionsArgs<TweetResponse, ErrorResponse, Key, {
        data?: TweetPostRequest | undefined;
    } | undefined>,
    otherMutate?: KeyedMutator<TweetResponse[]> | null,
    handleClose?: { (): void } | null,
}


export const TweetForm: React.FC<TweetFormProps> = (props: TweetFormProps) => {
    const { createTweetTrigger, otherMutate, handleClose } = props;
    const { allTweets: { mutate: allTweetsMutate }, followingTweets: { mutate: followingTweetsMutate } } = useTweetContext()
    const [tweetText, setTweetText] = useState('');
    const [tags, setTags] = useState<string[]>([]); // 入力されたタグのリスト
    console.log(tags)
    const handleChange = (tags: string[]) => {
        setTags(tags);
    };
    const onSubmit = (tweetText: string, hashtags: string[]) => {
        createTweetTrigger({ data: { body: tweetText, tags: hashtags } })
            .then(() => {
                const promises = [allTweetsMutate(), followingTweetsMutate()]
                if (otherMutate) {
                    promises.push(otherMutate())
                }
                return Promise.all([promises])
            })
            .then(() => {
                if (handleClose) {
                    handleClose()
                }
            })
    }

    const handleSubmit = () => {
        onSubmit(tweetText, tags);
        setTweetText('');
        setTags([]);
    };

    const handleTweetTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTweetText(event.target.value);
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <TextField
                style={{ marginBottom: '16px' }}
                placeholder="What's happening?"
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={tweetText}
                onChange={handleTweetTextChange}
            />
            <MuiChipsInput
                style={{ marginBottom: '16px' }}
                placeholder="Type hashtags and press enter"
                helperText={tags.length > 0 ? "Double click to edit a chip" : ""}
                clearInputOnBlur
                value={tags}
                onChange={handleChange}
            />
            <Button
                style={{ alignSelf: 'flex-end' }}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
            >
                Tweet
            </Button>
        </Box>
    );
};