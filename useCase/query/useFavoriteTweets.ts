import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useFavoriteTweets = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>("/tweets/favorites", token);
    return { data, error, isLoading, mutate }
}
