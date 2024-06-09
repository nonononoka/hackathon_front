import { SubmitHandler, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { FormType } from ".";

type TweetFormProps = {
  onSubmit: SubmitHandler<FormType>
  register: UseFormRegister<FormType>
  handleSubmit: UseFormHandleSubmit<FormType, undefined>
}

export const TweetForm = (props: TweetFormProps) => {
  const { onSubmit, register, handleSubmit } = props

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
