import { useForm, SubmitHandler, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { FormType } from "@/presentation/pages/Home";
import { TriggerWithOptionsArgs } from "swr/mutation";
import { TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";
import { Key } from "swr";
import { TweetPostRequest } from "@/types/apiTweet";
import { KeyedMutator } from "swr";

type TweetFormProps = {
    createTweetTrigger: TriggerWithOptionsArgs<TweetResponse, ErrorResponse, Key, {
        data?: TweetPostRequest | undefined;
    } | undefined>,
    tweetsMutate: KeyedMutator<TweetResponse[]> | null,
    handleClose : { () : void }| null,
}

export const TweetForm = (props: TweetFormProps) => {
    const { createTweetTrigger, tweetsMutate, handleClose } = props;
    const { register, handleSubmit, reset } = useForm<FormType>()
    const onSubmit: SubmitHandler<FormType> = (data) => {
        createTweetTrigger({ data: { body: data.tweet, tags: data.tags ? [...data.tags] : [] } })
            .then(() => {
                if (tweetsMutate) {
                    tweetsMutate()
                }
            })
            .then(() => {
                if (handleClose){
                    handleClose()
                }
                reset()
            })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("tweet", { required: "tweetを入力して" })} />
            <input {...register("tags", { required: "tagを入力して" })} />
            <button type="submit">
                POST
            </button>
        </form >
    )
}
