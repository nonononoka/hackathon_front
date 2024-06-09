import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useFollowingTweets = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>("/friendships/tweets", token);
    return { data, error, isLoading, mutate }
}
