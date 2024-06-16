'use client';

import { useCreateReplyTweet } from '@/useCase/command/createReplyTweet';
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation';
type ReplyProps = {
    id: string
}

export type FormType = {
    tweet: string;
}

export const Reply = (props: ReplyProps) => {
    const router = useRouter()
    const { id:replyingTweetId } = props

    const { createReplyTweetTrigger } = useCreateReplyTweet(replyingTweetId)
    const { register, handleSubmit, reset } = useForm<FormType>()
    const onSubmit: SubmitHandler<FormType> = (data) => {
        createReplyTweetTrigger({ data: { body: data.tweet } })
            .then(() => {
                reset()
                router.push("/home")
            })
    }

    return (
        <>
            <p>reply</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("tweet", { required: "tweetを入力して" })} />
                <button type="submit">
                    POST
                </button>
            </form >
        </>
    )
}
