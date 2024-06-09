import { useTag } from "@/useCase/query/useTag";
import { useAuthToken } from "@/useCase/query/useAuthToken";
import { Dispatch, SetStateAction } from "react";

type TagFormProps = {
    setSelectedTags: Dispatch<SetStateAction<string[]>>
}

export const TagForm = (props: TagFormProps) => {
    const { setSelectedTags } = props
    const { data: token } = useAuthToken()
    const { data, isLoading, error } = useTag(token)

    if (isLoading || error) {
        return <p>isLoading</p>
    }

    return (
        <>
            {data?.map((tag) => <button key={tag.id} onClick={() => setSelectedTags((prevTags) => [...prevTags, tag.tag])}>{tag.tag}</button>)}
            <button type="submit">
                SEARCH
            </button>
        </>
    )
}
