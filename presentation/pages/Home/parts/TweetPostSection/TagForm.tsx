import { SubmitHandler, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { FormType } from ".";

type TweetFormProps = {
    onSubmit: SubmitHandler<FormType>
    register: UseFormRegister<FormType>
    handleSubmit: UseFormHandleSubmit<FormType, undefined>
}

// tag検索Form
export const TagForm = () => {
    //   const { onSubmit, register, handleSubmit } = props

    return (
        <button type="submit">
            SEARCH
        </button>
    )
}
