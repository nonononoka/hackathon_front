import { TweetForm } from "./TweetForm"
import { TweetList } from "./TweetList"
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useCreateTweet } from "@/useCase/command/createTweet";
import { TweetResponse } from "@/types/apiTweet";
import { useTweet } from "@/useCase/query/useTweet";

export type FormType = {
    tweet: string;
    tags?: string[];
}

export const TweetSection = () => {
    const [postedTweets, setPostedTweets] = useState<TweetResponse[]>([])
    const { register, handleSubmit, reset } = useForm<FormType>()
    const { getTweetResult, getTweet, getTweetError, getTweetReset } = useTweet()
    const { createTweetTrigger, createTweetError, createTweetReset } = useCreateTweet()

    const onSubmit: SubmitHandler<FormType> = (data) => {
        console.log(data.tags)
        createTweetTrigger({ data: { body: data.tweet, tags: data.tags ? [...data.tags] : [] } })
            .then((tweet) => setPostedTweets([...postedTweets, tweet]))
            .then(() => {
                reset()
            })
    }

    useEffect(() => {
        getTweet()
    }, [])

    useEffect(() => {
        if (getTweetResult) {
            setPostedTweets([...getTweetResult])
        }
    }, [getTweetResult])

    if (createTweetError) {
        alert("errorが発生しました")
        createTweetReset()
    }

    if (getTweetError) {
        alert("errorが発生しました")
        getTweetReset()
    }

    return (
        <>
            <TweetForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} />
            <TweetList tweets={postedTweets} />
        </>
    )
}