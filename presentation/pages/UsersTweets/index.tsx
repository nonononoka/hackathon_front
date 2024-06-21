import { useUserTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { UsersTweets } from "./parts/UsersTweets"

type UsersTweetsSectionProps = {
    userID: string
}

export const UsersTweetsSection = (props: UsersTweetsSectionProps) => {
    const { data: token } = useAuthToken()
    const { data, isLoading, mutate, error } = useUserTweets(token, props.userID)
    if (isLoading) {
        return <p>isLoading...</p>
    }

    return (
        <>
            <UsersTweets tweets={data} />
        </>
    )
}