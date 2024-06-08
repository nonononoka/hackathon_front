import { SubmitHandler, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { TweetFormType } from ".";

type TweetFormProps = {
  onSubmit: SubmitHandler<TweetFormType>
  register: UseFormRegister<TweetFormType>
  handleSubmit: UseFormHandleSubmit<TweetFormType, undefined>
}

export const TweetForm = (props: TweetFormProps) => {
  const { onSubmit, register, handleSubmit } = props

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("tweet", { required: "tweetを入力して" })} />
      <button type="submit">
        POST
      </button>
    </form >
  )
}
