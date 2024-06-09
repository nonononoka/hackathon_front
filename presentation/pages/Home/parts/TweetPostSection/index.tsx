import { TweetForm } from "./TweetForm"
import { TweetList } from "./TweetList"
import { useForm, SubmitHandler } from "react-hook-form";
import { TagForm } from "./TagForm";
import { useTweet } from "@/useCase/query/useTweet";
import { useCreateTweet } from "@/useCase/command/createTweet";
import { useAuthToken } from "@/useCase/query/useAuthToken";

export type FormType = {
    tweet: string;
    tags?: string[];
}

export const TweetPostSection = () => {
    const {data: token} = useAuthToken()
    const { data, isLoading, error, mutate } = useTweet(token)
    const { createTweetTrigger, createTweetError, createTweetReset } = useCreateTweet()

    const { register, handleSubmit, reset } = useForm<FormType>()
    const onSubmit: SubmitHandler<FormType> = (data) => {
        createTweetTrigger({ data: { body: data.tweet, tags: data.tags ? [...data.tags] : [] } })
            .then(() => mutate())
            .then(() => {
                reset()
            })
    }

    if (error){
        return <div>{error.message}</div>
    }

    if (createTweetError){
        createTweetReset()
        return <div>{createTweetError.message}</div>
    }

    if (isLoading || !data){
        return <div>Loading</div>
    }

    return (
        <>
            <TweetForm onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} />
            <TagForm />
            <TweetList tweets={data} />
        </>
    )
}