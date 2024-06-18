import { useTweets } from "@/useCase/query/useTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"
import { useCreateFavorite } from "@/useCase/command/createFavorite"
import Link from 'next/link'
import { useState } from "react"

type EachTweetProps = {
    id: string,
    body: string,
    postedAt: string,
    postedBy: string,
    postedByName: string,
    likeCount: number,
    tags: string[]
}

export const EachTweet = (props: EachTweetProps) => {
    const { data: token } = useAuthToken()
    const [tweet, setTweet] = useState(props)
    const { createFavorite } = useCreateFavorite(tweet.id)
    const { data, isLoading, mutate, error } = useTweets(token, tweet.id)
    const handleFav = () => {
        createFavorite()
            .then(() => mutate())
            .then((data) => { if (!!data) setTweet(data[0]) })
    }

    return (
        <>
            <p key={tweet.id}>{tweet.body}, {tweet.postedAt}, {tweet.postedByName}, {tweet.likeCount} , {tweet.tags}</p>
            <Link href = {`/users/${tweet.postedBy}`}>
                {tweet.postedByName}
            </Link>
            <button onClick={handleFav}>likes</button>
            <Link href={`/reply/${tweet.id}`}>
                reply
            </Link>
        </>
    )
}